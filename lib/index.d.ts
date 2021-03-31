export declare function createSharedCompute<T extends (...args: any[]) => any, U extends (...args: any[]) => boolean>(fn: T, areEqual?: U): (...args: Parameters<T>) => ReturnType<T>;
