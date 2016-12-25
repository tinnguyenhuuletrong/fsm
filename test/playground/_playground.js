const a = [1,2,3,4,5,6]

const res = a.reduce((acc, val, index) => {
	if(val % 2 == 0)
		return val
	return 0
}, 0)

console.log(res)