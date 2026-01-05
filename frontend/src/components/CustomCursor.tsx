import React, { useEffect, useRef, useState } from 'react';
import ExecutionEnvironment from '@docusaurus/ExecutionEnvironment';

export default function CustomCursor() {
    if (!ExecutionEnvironment.canUseDOM) {
        return null;
    }

    const cursorRef = useRef<HTMLDivElement>(null);
    const [hidden, setHidden] = useState(false);
    const [hovering, setHovering] = useState(false);
    const [clicking, setClicking] = useState(false);
    // Initialize isDark based on the DOM attribute directly
    const [isDark, setIsDark] = useState(() =>
        document.documentElement.getAttribute('data-theme') === 'dark'
    );

    useEffect(() => {
        // Observer to track theme changes without relying on React Context
        const observer = new MutationObserver((mutations) => {
            mutations.forEach((mutation) => {
                if (mutation.type === 'attributes' && mutation.attributeName === 'data-theme') {
                    setIsDark(document.documentElement.getAttribute('data-theme') === 'dark');
                }
            });
        });

        observer.observe(document.documentElement, {
            attributes: true,
            attributeFilter: ['data-theme'],
        });

        return () => observer.disconnect();
    }, []);

    useEffect(() => {
        const cursor = cursorRef.current;

        const onMouseMove = (e: MouseEvent) => {
            if (cursor) {
                cursor.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0)`;
            }

            const target = e.target as HTMLElement;
            if (target.tagName === 'A' || target.tagName === 'BUTTON' || target.closest('a, button, .clickable')) {
                setHovering(true);
            } else {
                setHovering(false);
            }

            if (hidden) setHidden(false);
        };

        const onMouseDown = () => setClicking(true);
        const onMouseUp = () => setClicking(false);
        const onMouseLeave = () => setHidden(true);
        const onMouseEnter = () => setHidden(false);

        document.addEventListener('mousemove', onMouseMove, { passive: true });
        document.addEventListener('mousedown', onMouseDown, { passive: true });
        document.addEventListener('mouseup', onMouseUp, { passive: true });
        document.addEventListener('mouseleave', onMouseLeave);
        document.addEventListener('mouseenter', onMouseEnter);

        if (window.matchMedia("(pointer: coarse)").matches) {
            setHidden(true);
        }

        return () => {
            document.removeEventListener('mousemove', onMouseMove);
            document.removeEventListener('mousedown', onMouseDown);
            document.removeEventListener('mouseup', onMouseUp);
            document.removeEventListener('mouseleave', onMouseLeave);
            document.removeEventListener('mouseenter', onMouseEnter);
        };
    }, [hidden]);

    if (hidden) return null;

    // Dynamic Colors based on Theme (State-based now, safe from Context errors)
    // Light Mode: Black Crosshair, Blue Ring
    // Dark Mode: White Crosshair, Cyan Ring
    const mainColor = isDark ? 'bg-cyan-400' : 'bg-blue-600';
    const ringColor = isDark ? 'border-cyan-400' : 'border-blue-600';
    const ringHoverColor = isDark ? 'border-cyan-300' : 'border-blue-500';
    const crosshairColor = isDark ? 'bg-white' : 'bg-gray-900';

    return (
        <>
            <div
                ref={cursorRef}
                className={`fixed top-0 left-0 pointer-events-none z-[10000] will-change-transform -ml-3 -mt-3
                    flex items-center justify-center
                `}
            >
                {/* Static Crosshair */}
                <div className={`absolute w-1 h-4 transition-colors duration-300 ${crosshairColor}
                    ${hovering ? `h-2 ${mainColor}` : ''}
                `} />
                <div className={`absolute w-4 h-1 transition-colors duration-300 ${crosshairColor}
                    ${hovering ? `w-2 ${mainColor}` : ''}
                `} />

                {/* Rotating Square - CSS Animation */}
                <div className={`absolute w-6 h-6 border-[1.5px] transition-all duration-300
                    ${ringColor}
                    ${hovering ? `rotate-45 scale-125 ${ringHoverColor}` : 'rotate-0 scale-100 opacity-50'}
                    ${clicking ? 'scale-75' : ''}
                `} />
            </div>

            <style>
                {`
                    body, a, button, [role="button"] {
                        cursor: none !important;
                    }
                `}
            </style>
        </>
    );
}
