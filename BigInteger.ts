export class BigInteger {
    private bigInteger: number[] = []
    private isNegative: boolean

    constructor(value?: string) {
        if(!value){
            this.isNegative = false
            return
        }

        let stringValue
        if(value.charAt(0) === "-"){
            this.isNegative = true;
            stringValue = value.substring(1)
        } else {
            this.isNegative = false;
            stringValue = value
        }


        for(let char of stringValue){
            if(char === ",") continue
            if(char < '0' || char > '9'){
                throw new Error("Invalid input");
            }
            this.bigInteger.push(+char)
        }
    }

    add(n: string | number): void {
        let str = (typeof n === 'number' ? n.toString() : n).replace(/,/g, '');
        if(str.charAt(0) === '-' && !this.isNegative){
            this.subtract(str.substring(1))
            return
        }
        if(this.isNegative && !(str.charAt(0) === "-")){
            const originalPositive = this.toString().substring(1)
            this.setBigInteger(str)
            this.subtract(originalPositive)
            return;
        }
        if(this.isNegative && str.charAt(0) === "-"){
            const positiveResult = new BigInteger(this.toString().substring(1))
            positiveResult.add(str.substring(1))
            this.setBigInteger("-" + positiveResult.toString())
            return;
        }

        let carry = 0;
        let i = this.bigInteger.length - 1;
        let j = str.length - 1;

        while (i >= 0 || j >= 0) {
            let sum = carry;
            if (i >= 0) {
                sum += this.bigInteger[i];
            }
            if (j >= 0) {
                sum += Number(str[j]);
                j--;
            }
            if (i >= 0) {
                this.bigInteger[i] = sum % 10;
                i--;
            } else if (j >= -1) {
                this.bigInteger.unshift(sum % 10);
            }
            carry = Math.floor(sum / 10);
        }

        if (carry > 0) {
            this.bigInteger.unshift(carry);
        }
    }

    subtract(n: string | number): void {
        let str = (typeof n === 'number' ? n.toString() : n).replace(/,/g, '');

        if(!(str.charAt(0) === '-') && this.isNegative){
            this.add("-" + str)
            return
        }
        if(str.charAt(0) === '-' && this.isNegative) {
            const originalPositive = this.toString().substring(1)
            this.setBigInteger(str.substring(1))
            this.subtract(originalPositive)
            return
        }
        if(str.charAt(0) === '-' && !this.isNegative){
            this.add(str.substring(1))
            return
        }

        let isSubtractNegative = false;

        // Check if str is a larger number
        if(str.length > this.bigInteger.length || (str.length === this.bigInteger.length && str > this.bigInteger.join(''))){
            let tmp = str;
            str = this.bigInteger.join('');
            this.setBigInteger(tmp);
            isSubtractNegative = true;
        }

        let i = this.bigInteger.length - 1;
        let j = str.length - 1;
        let borrow = 0;

        while(i >= 0 || j >= 0) {
            let digit1 = i >= 0 ? this.bigInteger[i] : 0;
            let digit2 = j >= 0 ? Number(str[j]) : 0;

            let diff = digit1 - digit2 - borrow;

            if(diff < 0) {
                diff += 10;
                borrow = 1;
            } else {
                borrow = 0;
            }

            if(i >= 0) {
                this.bigInteger[i] = diff;
                i--;
            } else if(j >= -1) {
                this.bigInteger.unshift(diff);
            }
            j--;
        }

        // Mend the leading zero issue
        while(this.bigInteger.length > 1 && this.bigInteger[0] === 0) {
            this.bigInteger.shift();
        }

        this.isNegative = isSubtractNegative;
    }

	multiply(other: string | number): void {
		let str = other.toString().replace(/,/g, '');
		let isOtherNegative = false;

		// Check if the other number is negative
		if (str[0] === '-') {
			isOtherNegative = true;
			str = str.substring(1);
		}

		let result = new BigInteger();
		let carry = 0;

		for (let i = this.bigInteger.length - 1; i >= 0; i--) {
			let temp = this.bigInteger[i] * Number(str) + carry;
			result.bigInteger[i] = temp % 10;
			carry = Math.floor(temp / 10);
		}

		if (carry > 0) {
			result.bigInteger.unshift(carry);
		}

		// Determine the sign of the result
		result.isNegative = this.isNegative !== isOtherNegative;

		// Remove leading zeros
		while (result.bigInteger.length > 1 && result.bigInteger[0] === 0) {
			result.bigInteger.shift();
		}

		this.setBigInteger(result.toString());
	}
	
	divide(other: string | number): void {
		let str = other.toString().replace(/,/g, '');
		let isOtherNegative = false;

		// Check if the other number is negative
		if (str[0] === '-') {
			isOtherNegative = true;
			str = str.substring(1);
		}

		let result = new BigInteger();
		let carry = 0;

		for (let i = 0; i < this.bigInteger.length; i++) {
			let temp = this.bigInteger[i] + carry * 10
			result.bigInteger[i] = Math.floor(temp / Number(str));
			carry = temp % Number(str);
		}

		// Remove leading zeros
		while (result.bigInteger.length > 1 && result.bigInteger[0] === 0) {
			result.bigInteger.shift();
		}

		// Determine the sign of the result
		result.isNegative = this.isNegative !== isOtherNegative;

		this.setBigInteger(result.toString());
	}

	isBigger(n: string | number): boolean {
		let str = (typeof n === 'number' ? n.toString() : n).replace(/,/g, '');
		if (this.isNegative && str.charAt(0) !== '-') {
			return false;
		}
		if (!this.isNegative && str.charAt(0) === '-') {
			return true;
		}
		if (this.bigInteger.length > str.length) {
			return !this.isNegative;
		}
		if (this.bigInteger.length < str.length) {
			return this.isNegative;
		}
		for (let i = 0; i < this.bigInteger.length; i++) {
			if (this.bigInteger[i] > Number(str[i])) {
				return !this.isNegative;
			}
			if (this.bigInteger[i] < Number(str[i])) {
				return this.isNegative;
			}
		}
		return false;
	}

    toString(): string {
        let str =  this.bigInteger.join("").replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        if(this.isNegative)
            return "-" + str
        else return str
    }

    setBigInteger(value: string){
        this.bigInteger = []

        let stringValue
        if(value.charAt(0) === "-"){
            this.isNegative = true;
            stringValue = value.substring(1)
        } else {
            this.isNegative = false;
            stringValue = value
        }


        for(let char of stringValue){
            if(char === ",") continue
            if(char < '0' || char > '9'){
                throw new Error("Invalid input");
            }
            this.bigInteger.push(+char)
        }
    }
}

for(let i = 0; i < 10; i++){
	const isPerfectNumber = (num: BigInteger): boolean => {
		let sum = new BigInteger();
		for (let i = new BigInteger(1); i.isBigger(num.divide(2)); i.add(1)) {
			if (num.divide(i).toString() === "0") {
				sum.add(i);
			}
		}
		return sum.toString() === num.toString();
	}

	const bigInt = new BigInteger();
	for (let i = new BigInteger(0); i.isBigger(10); i.add(1)) {
		if (isPerfectNumber(i)) {
			console.log(i.toString());
		}
	}
}






