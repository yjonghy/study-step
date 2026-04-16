export default function MediaStream() {
    return (
        <article className="w-full h-full flex flex-col justify-center mt-[40px]">
            <p className="text-gray060 heading-xl">MediaStream API & VAD</p>
            <p className="text-gray060 body-sm mt-[16px]">
                MediaStream API는 마이크·카메라 등 미디어 장치에 접근하는 브라우저 API다.<br />
                AudioContext와 결합하여 음성 데이터를 분석하고, VAD(Voice Activity Detection)로 발화 구간을 감지할 수 있다.
            </p>

            {/* getUserMedia */}
            <div className="mt-[28px] flex flex-col gap-[6px]">
                <p className="text-blue030 body-md">getUserMedia — 미디어 장치 접근</p>
                <div className="mt-[8px] bg-gray010 rounded-[8px] p-[12px]">
                    <p className="body-xs text-gray060 whitespace-pre-line">{`async function startRecording() {
  try {
    const stream = await navigator.mediaDevices.getUserMedia({
      audio: {
        echoCancellation: true,  // 에코 제거
        noiseSuppression: true,  // 노이즈 제거
        sampleRate: 16000,       // STT에 최적화된 샘플레이트
      },
      video: false,
    });

    // MediaRecorder로 녹음
    const recorder = new MediaRecorder(stream, {
      mimeType: 'audio/webm;codecs=opus',
    });

    recorder.ondataavailable = (e) => {
      sendChunkToSTT(e.data); // Azure STT 등에 전송
    };

    recorder.start(250); // 250ms마다 청크 생성
  } catch (err) {
    // NotAllowedError: 사용자 권한 거부
    // NotFoundError: 마이크 없음
    console.error(err);
  }
}`}</p>
                </div>
            </div>

            {/* AudioContext + AnalyserNode */}
            <div className="mt-[32px] flex flex-col gap-[6px]">
                <p className="text-blue030 body-md">AudioContext — 음성 신호 분석</p>
                <div className="mt-[8px] bg-gray010 rounded-[8px] p-[12px]">
                    <p className="body-xs text-gray060 whitespace-pre-line">{`const audioCtx = new AudioContext();
const source = audioCtx.createMediaStreamSource(stream);
const analyser = audioCtx.createAnalyser();
analyser.fftSize = 256;

source.connect(analyser);

const dataArray = new Uint8Array(analyser.frequencyBinCount);

function getVolume(): number {
  analyser.getByteTimeDomainData(dataArray);
  // RMS(Root Mean Square) 값으로 음량 계산
  const rms = Math.sqrt(
    dataArray.reduce((sum, v) => sum + (v - 128) ** 2, 0) / dataArray.length
  );
  return rms;
}`}</p>
                </div>
            </div>

            {/* VAD */}
            <div className="mt-[32px] flex flex-col gap-[6px]">
                <p className="text-blue030 body-md">VAD (Voice Activity Detection) — 발화 구간 감지</p>
                <p className="text-gray060 body-sm">음량 임계값(threshold)을 기준으로 사용자가 말하는 구간을 감지하여 불필요한 데이터 처리를 줄인다.</p>
                <div className="mt-[8px] bg-gray010 rounded-[8px] p-[12px]">
                    <p className="body-xs text-gray060 whitespace-pre-line">{`const SILENCE_THRESHOLD = 8;    // 임계값 (환경마다 조정)
const SILENCE_DURATION = 1500;  // 1.5초 침묵 시 발화 종료 판단

let silenceTimer: ReturnType<typeof setTimeout> | null = null;
let isSpeaking = false;

function detectVAD() {
  const volume = getVolume();

  if (volume > SILENCE_THRESHOLD) {
    // 발화 감지
    if (!isSpeaking) {
      isSpeaking = true;
      onSpeechStart();
    }
    if (silenceTimer) {
      clearTimeout(silenceTimer); // 침묵 타이머 리셋
      silenceTimer = null;
    }
  } else {
    // 침묵 감지
    if (isSpeaking && !silenceTimer) {
      silenceTimer = setTimeout(() => {
        isSpeaking = false;
        onSpeechEnd(); // STT 서버에 최종 전송
      }, SILENCE_DURATION);
    }
  }

  requestAnimationFrame(detectVAD);
}`}</p>
                </div>
            </div>

            {/* 정리 */}
            <div className="mt-[32px] flex flex-col gap-[6px]">
                <p className="text-blue030 body-md">리소스 정리 — 중요</p>
                <div className="mt-[8px] bg-gray010 rounded-[8px] p-[12px]">
                    <p className="body-xs text-gray060 whitespace-pre-line">{`// 컴포넌트 언마운트 시 반드시 정리
function cleanup() {
  stream.getTracks().forEach(track => track.stop()); // 마이크 해제
  audioCtx.close(); // AudioContext 닫기
  recorder.stop();  // 녹음 중지
}

// React
useEffect(() => {
  startRecording();
  return () => cleanup(); // cleanup 반환
}, []);`}</p>
                </div>
            </div>
        </article>
    )
}
