export class SoftAssert {
    private errors: string[];

    constructor() {
        this.errors = [];
    }

    /**
     * Perform a soft assertion by comparing actual and expected values.
     * @param actual The actual value to check.
     * @param expected The expected value to match.
     * @param message The error message to log if the assertion fails.
     */
    async softAssert(actual: any, expected: any, message: string): Promise<void> {
        if (actual !== expected) {
            this.errors.push(message);
        }
    }

    /**
     * Check if there are any soft assertion failures and throw an error if so.
     */
    softAssertAll(): void {
        if (this.errors.length > 0) {
            throw new Error(`Soft assertion failed: ${this.errors.join(", ")}`);
        }
    }

    /**
     * Get all the errors without throwing an exception.
     * @returns The list of errors.
     */
    getErrors(): string[] {
        return this.errors;
    }
}
