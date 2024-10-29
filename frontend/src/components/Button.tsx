export const Button = (props: React.PropsWithChildren) => {
  return (
    <button className="bg-black text-white rounded-full px-2 py-2">
      
      <span>{props.children}</span>
    </button>
  );
};
