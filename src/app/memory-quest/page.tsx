"use client"

import React, {useCallback, useEffect, useRef, useState} from "react"
import styles from "./memory-quest.module.css"
import {MEMORY_CONTENT, MemoryContent} from "./content"

type MiniGameState = "ready" | "playing" | "won" | "lost"
type EventKind = "massage" | "restaurant" | "goods" | "belly"
type RewardState = Record<EventKind, boolean>

const GROUND = 82
const PLAYER_W = 66
const PLAYER_H = 78
const SLOT_HEIGHTS = [178, 236, 158, 226, 176]
const slotPosition = (index: number) => 620 + index * 790
const getWorldWidth = (count: number) => Math.max(4700, slotPosition(Math.max(0, count - 1)) + 980)
const EVENT_AFTER_SLOTS = [3, 7, 11, 15]
const getEventPosition = (index: number) => slotPosition(EVENT_AFTER_SLOTS[index]) + 410
const EVENT_DEFS: Array<{kind: EventKind; icon: string; title: string; reward: string}> = [
    {kind: "massage", icon: "✋", title: "토닥토닥 챌린지", reward: "마사지 10회권"},
    {kind: "restaurant", icon: "🍽️", title: "오늘의 메뉴", reward: "맛집탐방"},
    {kind: "goods", icon: "🕹️", title: "두근두근 뽑기", reward: "원하는 굿즈"},
    {kind: "belly", icon: "🐻", title: "배만지기 마스터", reward: "배만지기"},
]
const MENU_ROUNDS = ["🍜", "🍣", "🍕"]
const MENU_OPTIONS = ["🍜", "🍣", "🍕", "🍔"]
const BELLY_SEQUENCE = ["↑", "←", "→", "↓", "→", "↑", "←", "↓"]

function Character({kind, companion}: {kind: "boy" | "girl"; companion?: boolean}) {
    return (
        <div className={`${styles.character} ${styles[kind]} ${companion ? styles.companion : ""}`} aria-hidden="true">
            <span className={styles.hair}/><span className={styles.face}/><span className={styles.eye}/><span className={styles.eyeTwo}/><span className={styles.smile}/>
            <span className={styles.body}/><span className={styles.arm}/><span className={styles.legs}/>
        </div>
    )
}

export default function MemoryQuestPage() {
    const viewportRef = useRef<HTMLDivElement>(null)
    const worldRef = useRef<HTMLElement>(null)
    const playersRef = useRef<HTMLDivElement>(null)
    const progressRef = useRef<HTMLElement>(null)
    const keys = useRef({left: false, right: false})
    const physics = useRef({x: 120, y: GROUND, vx: 0, vy: 0, last: 0, hit: -1})
    const finishTriggered = useRef(false)
    const slotsRef = useRef(MEMORY_CONTENT)
    const worldWidthRef = useRef(getWorldWidth(MEMORY_CONTENT.length))
    const slots = MEMORY_CONTENT
    const [activeLetter, setActiveLetter] = useState<MemoryContent | null>(null)
    const [soundOn, setSoundOn] = useState(false)
    const [toast, setToast] = useState("사진 블록을 아래에서 점프로 톡!")
    const [activeEvent, setActiveEvent] = useState<EventKind | null>(null)
    const [miniGameState, setMiniGameState] = useState<MiniGameState>("ready")
    const [massageCount, setMassageCount] = useState(0)
    const [gameTime, setGameTime] = useState(7)
    const [rewards, setRewards] = useState<RewardState>({massage: false, restaurant: false, goods: false, belly: false})
    const [menuRound, setMenuRound] = useState(0)
    const [goodsPosition, setGoodsPosition] = useState(8)
    const goodsDirection = useRef(1)
    const [goodsAttempts, setGoodsAttempts] = useState(3)
    const [bellyInput, setBellyInput] = useState<string[]>([])
    const [bellyPreview, setBellyPreview] = useState(false)
    const [finishCelebrating, setFinishCelebrating] = useState(false)

    const worldWidth = getWorldWidth(slots.length)
    const scenerySegments = Array.from({length: Math.ceil(worldWidth / 760)}, (_, index) => index)
    const animalFriends = [
        {icon: "🐭", name: "생쥐", left: worldWidth * .14, delay: "-.8s"},
        {icon: "🐹", name: "햄스터", left: worldWidth * .31, delay: "-3.1s"},
        {icon: "•ᴥ•", name: "두더지", left: worldWidth * .49, delay: "-1.9s"},
        {icon: "🐿️", name: "다람쥐", left: worldWidth * .68, delay: "-4.2s"},
        {icon: "🐶", name: "강아지", left: worldWidth * .85, delay: "-2.5s"},
    ]

    useEffect(() => {
        try {
            setRewards(EVENT_DEFS.reduce((result, item) => ({
                ...result,
                [item.kind]: localStorage.getItem(`memory-quest-reward-${item.kind}`) === "won" ||
                    (item.kind === "massage" && localStorage.getItem("memory-quest-massage-coupon") === "won")
            }), {} as RewardState))
        } catch { /* use defaults */ }
    }, [])

    useEffect(() => {
        if (miniGameState !== "playing" || (activeEvent !== "massage" && activeEvent !== "belly")) return
        const timer = window.setInterval(() => {
            setGameTime(current => {
                if (current <= 1) {
                    setMiniGameState("lost")
                    return 0
                }
                return current - 1
            })
        }, 1000)
        return () => window.clearInterval(timer)
    }, [activeEvent, miniGameState])

    useEffect(() => {
        if (activeEvent !== "goods" || miniGameState !== "playing") return
        const mover = window.setInterval(() => {
            setGoodsPosition(current => {
                let next = current + goodsDirection.current * 2.3
                if (next >= 96 || next <= 4) {
                    goodsDirection.current *= -1
                    next = Math.max(4, Math.min(96, next))
                }
                return next
            })
        }, 28)
        return () => window.clearInterval(mover)
    }, [activeEvent, miniGameState])

    useEffect(() => {
        if (!bellyPreview) return
        const preview = window.setTimeout(() => setBellyPreview(false), 2000)
        return () => window.clearTimeout(preview)
    }, [bellyPreview])

    useEffect(() => {
        if (!finishCelebrating) return
        const celebration = window.setTimeout(() => setFinishCelebrating(false), 4500)
        return () => window.clearTimeout(celebration)
    }, [finishCelebrating])

    const jump = useCallback(() => {
        if (physics.current.y <= GROUND + 2) {
            physics.current.vy = 760
            setToast("")
        }
    }, [])

    useEffect(() => {
        const down = (event: KeyboardEvent) => {
            if (activeLetter) {
                if (["ArrowLeft", "ArrowRight", "ArrowUp", "ArrowDown", "Space"].includes(event.code)) {
                    event.preventDefault()
                    setActiveLetter(null)
                }
                return
            }
            if (activeEvent) return
            if (["ArrowLeft", "ArrowRight", "Space"].includes(event.code)) event.preventDefault()
            if (event.code === "ArrowLeft") keys.current.left = true
            if (event.code === "ArrowRight") keys.current.right = true
            if (event.code === "Space" || event.code === "ArrowUp") jump()
        }
        const up = (event: KeyboardEvent) => {
            if (event.code === "ArrowLeft") keys.current.left = false
            if (event.code === "ArrowRight") keys.current.right = false
        }
        window.addEventListener("keydown", down, {passive: false})
        window.addEventListener("keyup", up)
        return () => { window.removeEventListener("keydown", down); window.removeEventListener("keyup", up) }
    }, [activeEvent, activeLetter, jump])

    useEffect(() => {
        let frame = 0
        const tick = (time: number) => {
            const p = physics.current
            const dt = Math.min((time - (p.last || time)) / 1000, .032)
            p.last = time
            const direction = (keys.current.right ? 1 : 0) - (keys.current.left ? 1 : 0)
            p.vx += (direction * 390 - p.vx) * Math.min(1, dt * 11)
            p.vy -= 1850 * dt
            const currentWorldWidth = worldWidthRef.current
            p.x = Math.max(28, Math.min(currentWorldWidth - 150, p.x + p.vx * dt))
            const previousTop = p.y + PLAYER_H
            p.y += p.vy * dt
            if (p.y <= GROUND) { p.y = GROUND; p.vy = 0 }

            const finishX = currentWorldWidth - 310
            const touchesFinish = p.x + PLAYER_W > finishX - 10 && p.x < finishX + 180
            if (!finishTriggered.current && touchesFinish && p.y > GROUND + 12) {
                finishTriggered.current = true
                setFinishCelebrating(true)
                setToast("")
            }

            if (p.vy > 0) {
                slotsRef.current.forEach((_, index) => {
                    const slotX = slotPosition(index)
                    const blockBottom = SLOT_HEIGHTS[index % SLOT_HEIGHTS.length]
                    const playerTop = p.y + PLAYER_H
                    const xOverlap = p.x + PLAYER_W > slotX && p.x < slotX + 152
                    if (xOverlap && previousTop <= blockBottom + 8 && playerTop >= blockBottom && p.hit !== index) {
                        p.hit = index
                        p.vy = -130
                        setActiveLetter(slotsRef.current[index])
                    }
                })
                EVENT_DEFS.forEach((item, index) => {
                    const eventX = getEventPosition(index)
                    const eventOverlap = p.x + PLAYER_W > eventX && p.x < eventX + 150
                    const hitId = -100 - index
                    if (eventOverlap && previousTop <= 190 && p.y + PLAYER_H >= 190 && p.hit !== hitId) {
                        p.hit = hitId
                        p.vy = -130
                        setActiveEvent(item.kind)
                        setMiniGameState(localStorage.getItem(`memory-quest-reward-${item.kind}`) === "won" ? "won" : "ready")
                    }
                })
            }
            if (p.vy <= 0) p.hit = -1
            const viewport = viewportRef.current?.clientWidth || window.innerWidth
            const camera = Math.max(0, Math.min(currentWorldWidth - viewport, p.x - viewport * .36))
            if (worldRef.current) worldRef.current.style.transform = `translate3d(${-camera}px,0,0)`
            if (playersRef.current) {
                playersRef.current.style.transform = `translate3d(${p.x}px,${-(p.y - GROUND)}px,0)`
                playersRef.current.classList.toggle(styles.isJumping, p.y > GROUND + 3)
            }
            if (progressRef.current) progressRef.current.style.width = `${Math.min(100, p.x / (currentWorldWidth - 250) * 100)}%`
            frame = requestAnimationFrame(tick)
        }
        frame = requestAnimationFrame(tick)
        return () => cancelAnimationFrame(frame)
    }, [])

    const hold = (key: "left" | "right", pressed: boolean) => { keys.current[key] = pressed }

    const openEvent = (kind: EventKind) => {
        setActiveEvent(kind)
        setMiniGameState(rewards[kind] ? "won" : "ready")
    }

    const winReward = (kind: EventKind) => {
        setMiniGameState("won")
        setRewards(current => ({...current, [kind]: true}))
        localStorage.setItem(`memory-quest-reward-${kind}`, "won")
    }

    const startMiniGame = () => {
        setMassageCount(0)
        setMenuRound(0)
        setGoodsPosition(8)
        goodsDirection.current = 1
        setGoodsAttempts(3)
        setBellyInput([])
        setBellyPreview(activeEvent === "belly")
        setGameTime(activeEvent === "belly" ? 10 : 7)
        setMiniGameState("playing")
    }

    const massageTap = () => {
        if (miniGameState !== "playing") return
        setMassageCount(current => {
            const next = current + 1
            if (next >= 10) {
                winReward("massage")
            }
            return next
        })
    }

    const chooseMenu = (menu: string) => {
        if (miniGameState !== "playing") return
        if (menu !== MENU_ROUNDS[menuRound]) {
            setMiniGameState("lost")
            return
        }
        if (menuRound === MENU_ROUNDS.length - 1) winReward("restaurant")
        else setMenuRound(current => current + 1)
    }

    const grabGoods = () => {
        if (miniGameState !== "playing") return
        if (goodsPosition >= 43 && goodsPosition <= 57) {
            winReward("goods")
            return
        }
        setGoodsAttempts(current => {
            if (current <= 1) setMiniGameState("lost")
            return Math.max(0, current - 1)
        })
    }

    const pressBellyArrow = (arrow: string) => {
        if (miniGameState !== "playing") return
        const index = bellyInput.length
        if (arrow !== BELLY_SEQUENCE[index]) {
            setMiniGameState("lost")
            return
        }
        const next = [...bellyInput, arrow]
        setBellyInput(next)
        if (next.length === BELLY_SEQUENCE.length) winReward("belly")
    }

    return (
        <main className={styles.game} ref={viewportRef}>
            <div className={styles.skyGlow}/>
            <header className={styles.hud}>
                <div className={styles.brand}><span className={styles.heart}>♥</span><div><b>아가햄찌와의 동행</b><small>둘이 함께한 2026년</small></div></div>
                <div className={styles.hudActions}>
                    <button onClick={() => setSoundOn(v => !v)} aria-label={soundOn ? "그대 재생 정지" : "그대 재생"} title="Brown Eyed Soul - 그대">{soundOn ? "Ⅱ" : "♪"}</button>
                </div>
            </header>

            {soundOn && (
                <div className={styles.musicPlayer}>
                    <iframe
                        src="https://www.youtube-nocookie.com/embed/ZsSsWeAJCwM?autoplay=1&loop=1&playlist=ZsSsWeAJCwM&playsinline=1"
                        title="Brown Eyed Soul - 그대 (STONE MUSIC 공식 영상)"
                        allow="autoplay; encrypted-media; picture-in-picture"
                        referrerPolicy="strict-origin-when-cross-origin"
                        allowFullScreen
                    />
                </div>
            )}

            <div className={styles.progress}>
                <span>START</span><div><i ref={progressRef}/></div><span>♥</span>
            </div>

            <section className={styles.world} ref={worldRef} style={{width: worldWidth}}>
                <div className={styles.clouds}><i/><i/><i/><i/><i/></div>
                <div className={styles.hills}><i/><i/><i/><i/><i/><i/></div>
                <div className={styles.skyDecor}>
                    <div className={styles.airship} style={{left: worldWidth * .18}}><span>♥</span><b>아가햄찌의 곁에는 항상 내가!</b><i/><i/></div>
                    <div className={styles.balloon} style={{left: worldWidth * .48}}><span>이쁘다<br/>우리공주님</span><i/></div>
                    <div className={styles.airship} style={{left: worldWidth * .72}}><span>✦</span><b>우리는 함께일때 강하다 나가자 싸우자 이기자 악!</b><i/><i/></div>
                </div>

                <div className={styles.scenery} aria-hidden="true">
                    {scenerySegments.map(index => index % 3 === 0
                        ? <div className={styles.tree} style={{left: index * 760 + 330}} key={`tree-${index}`}><i/><span/></div>
                        : index % 3 === 1
                            ? <div className={styles.fence} style={{left: index * 760 + 390}} key={`fence-${index}`}><i/><i/><i/><i/></div>
                            : <div className={styles.flowerBush} style={{left: index * 760 + 360}} key={`flowers-${index}`}><i/><i/><i/></div>
                    )}
                </div>

                <div className={styles.animalLayer} aria-hidden="true">
                    {animalFriends.map(friend => <div className={styles.animal} style={{left: friend.left, animationDelay: friend.delay}} key={friend.name}><span>{friend.icon}</span><small>{friend.name}</small></div>)}
                </div>

                {slots.map((slot, index) => (
                    <div className={styles.memoryBlock} key={slot.id} style={{left: slotPosition(index), bottom: SLOT_HEIGHTS[index % SLOT_HEIGHTS.length]}}>
                        <div className={styles.photoFrame}>
                            {slot.image ? <img src={slot.image} alt={slot.title} loading="lazy" decoding="async"/> : <div className={styles.emptyPhoto}><span>＋</span><small>PHOTO {index + 1}</small></div>}
                        </div>
                        <div className={styles.blockLabel}>?</div>
                        <span className={styles.sparkle}>✦</span>
                    </div>
                ))}

                {EVENT_DEFS.map((item, index) => (
                    <button className={`${styles.eventBlock} ${styles[`event${index + 1}`]} ${rewards[item.kind] ? styles.eventComplete : ""}`} style={{left: getEventPosition(index)}} onClick={() => openEvent(item.kind)} key={item.kind}>
                        <span className={styles.eventBadge}>{rewards[item.kind] ? "GET!" : index === 3 ? "HARD" : "EVENT"}</span>
                        <span className={styles.eventIcon}>{item.icon}</span>
                        <b>{item.title}</b>
                        <small>{rewards[item.kind] ? `${item.reward} 획득` : "점프해서 PLAY"}</small>
                    </button>
                ))}

                {slots.flatMap((_, index) => [slotPosition(index) + 250, slotPosition(index) + 300]).map((x, i) => <span className={styles.coin} style={{left: x, bottom: 150 + (i % 3) * 34}} key={x}>♥</span>)}
                <div className={`${styles.finish} ${finishCelebrating ? styles.finishReached : ""}`} style={{left: worldWidth - 310}}><span>가자!<br/>더넒은 모험의<br/>세계로!</span><i>♥</i></div>

                <div className={styles.players} ref={playersRef} style={{left: 0, bottom: GROUND, transform: "translate3d(120px,0,0)"}}>
                    <Character kind="boy"/><Character kind="girl" companion/>
                    <span className={styles.playerShadow}/>
                </div>
                <div className={styles.ground}><div className={styles.grass}/><div className={styles.soil}/></div>
            </section>

            {toast && <div className={styles.tip}>{toast}</div>}
            {finishCelebrating && (
                <div className={styles.finishCelebration} role="status" aria-live="polite">
                    <i/><i/><i/><i/>
                    <b>사랑해 아가햄찌야</b>
                </div>
            )}
            <div className={styles.keyboardHint}><span>←</span><span>→</span> 이동 <span className={styles.space}>SPACE</span> 점프</div>
            <div className={styles.mobileControls}>
                <button onPointerDown={() => hold("left", true)} onPointerUp={() => hold("left", false)} onPointerCancel={() => hold("left", false)}>←</button>
                <button onPointerDown={() => hold("right", true)} onPointerUp={() => hold("right", false)} onPointerCancel={() => hold("right", false)}>→</button>
                <button className={styles.jumpButton} onPointerDown={jump}>↑<small>JUMP</small></button>
            </div>

            {activeLetter && (
                <div className={styles.modalBackdrop} onClick={() => setActiveLetter(null)}>
                    <article className={styles.letter} onClick={e => e.stopPropagation()}>
                        <button className={styles.close} onClick={() => setActiveLetter(null)}>×</button>
                        <div className={styles.letterPhoto}>
                            <div className={styles.letterPhotoViewport}>
                                {activeLetter.image ? <img src={activeLetter.image} alt="추억"/> : <span>사진을 추가하면<br/>여기에 나타나요</span>}
                            </div>
                        </div>
                        <div className={styles.letterBody}>{activeLetter.date && <small>{activeLetter.date}</small>}<h2>{activeLetter.title}</h2><p>{activeLetter.letter}</p><i>♥</i></div>
                        <button className={styles.continue} onClick={() => setActiveLetter(null)}>계속 여행하기 →</button>
                    </article>
                </div>
            )}

            {activeEvent && (
                <div className={styles.modalBackdrop} onClick={() => setActiveEvent(null)}>
                    <section className={styles.miniGame} onClick={event => event.stopPropagation()}>
                        <button className={styles.close} onClick={() => setActiveEvent(null)}>×</button>
                        <small>{activeEvent === "belly" ? "HARD EVENT" : "SPECIAL EVENT"}</small>
                        <h2>{EVENT_DEFS.find(item => item.kind === activeEvent)?.title}</h2>

                        {miniGameState === "ready" && <>
                            <div className={styles.massageHero}>{EVENT_DEFS.find(item => item.kind === activeEvent)?.icon}<i>♥</i></div>
                            {activeEvent === "massage" && <p>7초 안에 하트를 10번 토닥이면<br/><b>마사지 10회권</b>을 드려요!</p>}
                            {activeEvent === "restaurant" && <p>화면에 나온 메뉴를 순서대로 맞혀서<br/><b>맛집탐방</b>을 획득하세요!</p>}
                            {activeEvent === "goods" && <p>움직이는 집게를 선물 상자에 멈춰<br/><b>원하는 굿즈</b>를 획득하세요!</p>}
                            {activeEvent === "belly" && <p>8초 안에 8개의 방향을 정확히 입력하면<br/><b>배만지기</b>를 획득합니다. 가장 어려워요!</p>}
                            <button className={styles.gamePrimary} onClick={startMiniGame}>도전 시작</button>
                        </>}

                        {miniGameState === "playing" && activeEvent === "massage" && <><div className={styles.gameStatus}><span>남은 시간 <b>{gameTime}s</b></span><span><b>{massageCount}</b> / 10</span></div><button className={styles.tapHeart} onClick={massageTap} aria-label="하트 토닥이기">♥<small>TAP!</small></button><div className={styles.tapProgress}><i style={{width: `${massageCount * 10}%`}}/></div></>}

                        {miniGameState === "playing" && activeEvent === "restaurant" && <div className={styles.menuGame}>
                            <div className={styles.gameStatus}><span>메뉴 기억하기</span><span><b>{menuRound + 1}</b> / 3</span></div>
                            <p>오늘 먹고 싶은 메뉴는 <strong>{MENU_ROUNDS[menuRound]}</strong></p>
                            <div className={styles.menuOptions}>{MENU_OPTIONS.map(menu => <button key={menu} onClick={() => chooseMenu(menu)} aria-label={`${menu} 메뉴 선택`}>{menu}</button>)}</div>
                        </div>}

                        {miniGameState === "playing" && activeEvent === "goods" && <div className={styles.goodsGame}>
                            <div className={styles.gameStatus}><span>남은 기회</span><span><b>{goodsAttempts}</b>회</span></div>
                            <div className={styles.clawMachine}><span className={styles.claw} style={{left: `${goodsPosition}%`}}>▼</span><i/><div>🎁</div></div>
                            <button className={styles.gamePrimary} onClick={grabGoods}>여기서 집게 내리기!</button>
                        </div>}

                        {miniGameState === "playing" && activeEvent === "belly" && <div className={styles.bellyGame}>
                            <div className={styles.gameStatus}><span>남은 시간 <b>{gameTime}s</b></span><span><b>{bellyInput.length}</b> / 8</span></div>
                            {bellyPreview ? <><p className={styles.rememberText}>2초 동안 순서를 기억하세요!</p><div className={styles.sequence}>{BELLY_SEQUENCE.map((arrow, index) => <span className={styles.sequenceNow} key={index}>{arrow}</span>)}</div></> : <><p className={styles.rememberText}>기억한 순서를 입력하세요</p><div className={styles.sequence}>{BELLY_SEQUENCE.map((_, index) => <span className={index < bellyInput.length ? styles.sequenceDone : ""} key={index}>{index < bellyInput.length ? "✓" : "?"}</span>)}</div><div className={styles.arrowPad}>{["↑", "←", "↓", "→"].map(arrow => <button onClick={() => pressBellyArrow(arrow)} key={arrow}>{arrow}</button>)}</div></>}
                        </div>}

                        {miniGameState === "won" && <><div className={styles.coupon}><span>GIFT COUPON</span><b>{EVENT_DEFS.find(item => item.kind === activeEvent)?.reward}</b><small>{EVENT_DEFS.find(item => item.kind === activeEvent)?.title} 성공 선물</small><i>♥</i></div><p className={styles.successText}>보상을 획득했어요! 필요할 때 보여주세요.</p><button className={styles.gamePrimary} onClick={() => setActiveEvent(null)}>보상 챙기고 계속하기</button></>}
                        {miniGameState === "lost" && <><div className={styles.massageHero}>😵‍💫</div><p>아쉽지만 거의 다 왔어요.<br/>한 번 더 도전해 볼까요?</p><button className={styles.gamePrimary} onClick={startMiniGame}>다시 도전</button></>}
                    </section>
                </div>
            )}

        </main>
    )
}
