export const ssr = false;
export function load({ params }) {
	console.log(params);
	return {
		islands: [
			{
				x: 0,
				y: 0,
				b: 1,
				n: 0
			},
			{
				x: 1,
				y: 0,
				b: 1,
				n: 0
			}
		]
	};
}
