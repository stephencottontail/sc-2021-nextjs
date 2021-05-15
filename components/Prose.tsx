import tw, { styled } from "twin.macro";

const Prose = styled.article({
	...tw`p-4 bg-gray-100 text-gray-700`,
	h1: tw`mb-4 font-extrabold text-4xl`,
	h2: tw`mb-4 font-bold text-2xl`,
	h3: tw`mb-4 font-bold text-xl`,
	p: tw`mb-4`,
	a: tw`font-bold text-blue-700 border-blue-700 border-b-2 focus:border-b-4 hover:border-b-4 active:border-b-4 motion-safe:transition-all`,
	ul: {
		...tw`mb-4 pl-4 list-disc list-inside`,
		ul: {
			...tw`m-0`,
		},
		ol: {
			...tw`m-0`,
		},
	},
	ol: {
		...tw`mb-4 pl-4 list-decimal list-inside`,
		ul: {
			...tw`m-0`,
		},
		ol: {
			...tw`m-0`,
		},
	},
	code: {
		...tw`bg-gray-700 text-gray-100`,
		padding: "4px",
		borderRadius: "4px",
	},
	blockquote: {
		...tw`space-y-4 mb-4 p-4 bg-blue-100`,
		p: {
			...tw`m-0`,
		},
	},
	pre: {
		...tw`mb-4 p-4 overflow-x-scroll`,
		code: {
			...tw`p-0 bg-gray-100 text-gray-700`,
		},
	},
});

export default Prose;
