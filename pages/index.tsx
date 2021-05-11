import tw, { styled, theme } from "twin.macro";

const Wrapper = tw.div`space-y-8 py-8 font-bold`;
const Conditional = styled.div(({ secondary }: { secondary?: boolean }) => [
	tw`p-8 bg-blue-100 text-blue-700`,
	secondary && tw`bg-blue-700 text-blue-100`,
]);
const Button = styled.button(({ ghost }: { ghost?: boolean }) => [
	tw`appearance-none px-8 py-4 border-solid border-2 border-blue-700 bg-blue-700 text-gray-100 hover:bg-gray-100 hover:text-blue-700`,
	ghost &&
		tw`bg-gray-100 text-blue-700 hover:bg-blue-700 hover:text-gray-100`,
]);
const Prop = styled.div(({ secondary }: { secondary?: boolean }) => [
	tw`p-8 space-y-8 bg-gray-700 text-gray-100`,
	secondary && tw`text-4xl`,
	`code { color: ${theme`colors.blue.500`}`,
]);

export default function HomePage(): JSX.Element {
	return (
		<Wrapper>
			<h1 tw="text-center text-3xl">Tests</h1>
			<Conditional>This should be light mode!</Conditional>
			<Conditional secondary>This should be dark mode!</Conditional>
			<div tw="p-8 flex justify-around">
				<Button>Button</Button>
				<Button ghost>Ghost</Button>
				<Button>Button</Button>
				<Button ghost>Ghost</Button>
			</div>
			<Prop>
				<p>
					If this has the <code>secondary</code> prop, the text will
					be huge.
				</p>
			</Prop>
			<Prop secondary>
				<p>
					The syntax for this is <code>kinda ugly</code>, but usually
					wouldn&apos;t do in this way; you would usually be better
					off creating a child component with the appropriate styles.
				</p>
			</Prop>
			<div tw="p-8 sibling:bg-gray-700 sibling:text-gray-100">
				I have sibling styles attached to me. Because of that, I will
				not be in dark mode, but <code>div</code>s that are my siblings
				will.
			</div>
			<div tw="p-8">
				This is a sibling of the previous <code>div</code>, so this
				should be in dark mode.
			</div>
			<div tw="p-8">
				This is also a sibling for the previous <code>div</code>, so
				this should also be in dark mode.
			</div>
		</Wrapper>
	);
}
