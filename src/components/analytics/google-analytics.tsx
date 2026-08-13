"use client";

import Script from "next/script";
import {usePathname, useSearchParams} from "next/navigation";
import {Suspense, useEffect, useState} from "react";

const measurementId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;

function PageViewTracker() {
    const pathname = usePathname();
    const searchParams = useSearchParams();

    useEffect(() => {
        if (!measurementId) return;

        const query = searchParams.toString();
        const pagePath = query ? `${pathname}?${query}` : pathname;

        window.gtag?.("event", "page_view", {
            page_title: document.title,
            page_location: window.location.href,
            page_path: pagePath,
        });
    }, [pathname, searchParams]);

    return null;
}

export default function GoogleAnalytics() {
    const [isReady, setIsReady] = useState(false);

    if (!measurementId) return null;

    return (
        <>
            <Script
                src={`https://www.googletagmanager.com/gtag/js?id=${measurementId}`}
                strategy="afterInteractive"
            />
            <Script
                id="google-analytics"
                strategy="afterInteractive"
                onReady={() => setIsReady(true)}
            >
                {`
                    window.dataLayer = window.dataLayer || [];
                    function gtag(){dataLayer.push(arguments);}
                    window.gtag = gtag;
                    gtag('js', new Date());
                    gtag('config', '${measurementId}', { send_page_view: false });
                `}
            </Script>
            {isReady && (
                <Suspense fallback={null}>
                    <PageViewTracker/>
                </Suspense>
            )}
        </>
    );
}
