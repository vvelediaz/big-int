import { BigInteger } from './BigInteger.ts';
describe('BigInteger Tester', () => {

    /* SPRINT 1 TESTS */
    function toStringTest(initial: string) {
        const bigInt = new BigInteger(initial);
        expect(bigInt.toString()).toBe(initial);
    }

    test('basicToStringTest', () => {
        toStringTest("123,456");
    });

    test('basicNegativeToStringTest', () => {
        toStringTest("-123,456");
    });

    test('bigToStringTest', () => {
        toStringTest("46,376,937,677,490,009,712,648,124,896,970,078,050,417,018,260,538");
    });

    test('bigNegativeToStringTest', () => {
        toStringTest("-46,376,937,677,490,009,712,648,124,896,970,078,050,417,018,260,538");
    });

    /* SPRINT 2 TESTS */
    function additionTest(initial: string, add: string, expected: string) {
        const bigInt = new BigInteger(initial);
        bigInt.add(add);
        const stringAnswer = bigInt.toString();
        expect(stringAnswer).toBe(expected);
    }

    test('additionCarryTest', () => {
        additionTest("5", "9", "14");
    });

    test('additionCarryTestMedium', () => {
        additionTest("9,999", "1", "10,000");
    });

    test('additionCarryTestMediumSwap', () => {
        additionTest("1", "9,999", "10,000");
    });

    test('additionCarryAndAddTest', () => {
        additionTest("7", "14", "21");
    });

    test('additionCarryTestBig', () => {
        additionTest("9,999,999,999,999,999,999,999,999,999,999,999,999,999", "1", "10,000,000,000,000,000,000,000,000,000,000,000,000,000");
    });

    test('additionCarryTestVeryBig', () => {
        additionTest("37,107,287,533,902,102,798,797,998,220,837,590,246,510,135,740,250", "46,376,937,677,490,009,712,648,124,896,970,078,050,417,018,260,538", "83,484,225,211,392,112,511,446,123,117,807,668,296,927,154,000,788");
    });

    test('additionNegativeTest', () => {
        additionTest("-1", "1", "0");
    });

    test('additionNegativeTestSwap', () => {
        additionTest("1", "-1", "0");
    });

    test('additionNegativeTestOnlyNegatives', () => {
        additionTest("-1", "-1", "-2");
    });

    function subtractTest(initial: string, subtract: string, expected: string) {
        const bigInt = new BigInteger(initial);
        bigInt.subtract(subtract);
        const stringAnswer = bigInt.toString();
        expect(stringAnswer).toBe(expected);
    }

    test('subtractionSimpleTest', () => {
        subtractTest("53", "52", "1");
    });

    test('subtractionCarryTest', () => {
        subtractTest("2,000", "1,999", "1");
    });

    test('subtractionCarryTestSwap', () => {
        subtractTest("2,000", "1", "1,999");
    });

    test('subtractionNegativeTestPositives', () => {
        subtractTest("3", "5", "-2");
    });

    test('subtractionNegativeTestPositives2', () => {
        subtractTest("4", "44", "-40");
    });

    test('subtractionNegativeTestPositives3', () => {
        subtractTest("44", "436", "-392");
    });

    test('subtractionNegativeTestNegative', () => {
        subtractTest("44", "-436", "480");
    });

    test('subtractionNegativeTestNegativeSwap', () => {
        subtractTest("-44", "436", "-480");
    });

    test('subtractionNegativeTestBothNegatives', () => {
        subtractTest("-436", "-44", "-392");
    });

    test('subtractionHugeTest', () => {
        subtractTest("46,376,937,677,490,009,712,648,124,896,970,078,050,417,018,260,538", "37,107,287,533,902,102,798,797,998,220,837,590,246,510,135,740,250", "9,269,650,143,587,906,913,850,126,676,132,487,803,906,882,520,288");
    });
	
	/* SPRINT 3 TESTS */
	function multiplyTest(initial: string, multiplier: string, expected: string) {
		const bigInt = new BigInteger(initial);
		bigInt.multiply(multiplier);
		expect(bigInt.toString()).toBe(expected);
	}

	test('basicMultiplyTest', () => {
		multiplyTest("123,456", "2", "246,912");
	});

	test('basicNegativeMultiplyTest', () => {
		multiplyTest("-123,456", "2", "-246,912");
	});

	test('multiplyByZeroTest', () => {
		multiplyTest("123,456", "0", "0");
	});

	test('multiplyByOneTest', () => {
		multiplyTest("123,456", "1", "123,456");
	});

	test('multiplyTwoNegativeNumbersTest', () => {
		multiplyTest("-123,456", "-2", "246,912");
	});

	test('multiplyWithCarryTest', () => {
		multiplyTest("50", "50", "2,500");
	});

	function divideTest(initial: string, divisor: string, expected: string) {
		const bigInt = new BigInteger(initial);
		bigInt.divide(divisor);
		expect(bigInt.toString()).toBe(expected);
	}

	test('basicDivideTest', () => {
		divideTest("123,456", "2", "61,728");
	});

	test('basicNegativeDivideTest', () => {
		divideTest("-123,456", "2", "-61,728");
	});

	test('divideByOneTest', () => {
		divideTest("123,456", "1", "123,456");
	});

	test('divideByItselfTest', () => {
		divideTest("123,456", "123,456", "1");
	});

	test('divideZeroByNumberTest', () => {
		divideTest("0", "123,456", "0");
	});

	test('divideNumberByLargerNumberTest', () => {
		divideTest("123,456", "987,654,321", "0");
	});

	test('divideNegativeByPositiveTest', () => {
		divideTest("-123,456", "2", "-61,728");
	});

	test('dividePositiveByNegativeTest', () => {
		divideTest("123,456", "-2", "-61,728");
	});

	test('divideTwoNegativeNumbersTest', () => {
		divideTest("-123,456", "-2", "61,728");
	});

	test('isBiggerEdgeCases', () => {
		const bigInt = new BigInteger();

		// Test when both numbers are empty
		expect(bigInt.isBigger("")).toBe(false);

		// Test when one number is empty and the other is not
		bigInt.setBigInteger("123");
		expect(bigInt.isBigger("")).toBe(true);
		expect(bigInt.isBigger("0")).toBe(true);

		// Test when both numbers are zero
		bigInt.setBigInteger("0");
		expect(bigInt.isBigger("0")).toBe(false);

		// Test when one number is zero and the other is not
		bigInt.setBigInteger("0");
		expect(bigInt.isBigger("123")).toBe(false);
		expect(bigInt.isBigger("-123")).toBe(true);

		// Test when both numbers are positive
		bigInt.setBigInteger("123");
		expect(bigInt.isBigger("456")).toBe(false);
		expect(bigInt.isBigger("1")).toBe(true);

		// Test when both numbers are negative
		bigInt.setBigInteger("-123");
		expect(bigInt.isBigger("-456")).toBe(true);
		expect(bigInt.isBigger("-1")).toBe(false);

		// Test when one number is positive and the other is negative
		bigInt.setBigInteger("123");
		expect(bigInt.isBigger("-456")).toBe(true);
		expect(bigInt.isBigger("-1")).toBe(true);

		bigInt.setBigInteger("-123");
		expect(bigInt.isBigger("456")).toBe(false);
		expect(bigInt.isBigger("1")).toBe(false);
	});
});