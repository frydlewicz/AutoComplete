class Stopwatch {
    private time: number;

    public start(): void {
        this.time = Date.now();
    }

    public end(): number {
        return Date.now() - this.time;
    }
}
