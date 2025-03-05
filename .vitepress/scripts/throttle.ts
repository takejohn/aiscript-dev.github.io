export function useThrottle<F extends (...args: any) => void>(fn: F, delay: number) {
    let timer: number | null = null;
    let isFirst = true;
    return function (...args: Parameters<F>) {
        if (timer) {
            clearTimeout(timer);
            timer = null;
        }
        if (isFirst) {
            fn(...args);
            isFirst = false;
        } else {
            timer = window.setTimeout(() => {
                fn(...args);
                timer = null;
            }, delay);
        }
    };
}
