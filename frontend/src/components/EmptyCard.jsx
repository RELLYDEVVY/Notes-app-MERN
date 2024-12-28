// eslint-disable-next-line react/prop-types
const EmptyCard = ({ imgSrc, message }) => {
	return (
		<div className="fixed inset-0 flex flex-col items-center justify-center container mx-auto text-center text-xl font-semibold z-1 h-fit my-auto">
			<img className="w-[300px] " src={imgSrc} alt="" />
			<p className="mx-4 text-center max-w-[370px]">{message}</p>
		</div>
	);
};
export default EmptyCard;
