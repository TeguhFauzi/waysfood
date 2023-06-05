const SmallRestoListItem = (props) => {
  return (
    <div className="w-1/4 p-2">
      <div className="shadow-xl bg-white  p-3 flex gap-x-5 items-center rounded-md">
        <img src={props.image} alt="" />
        <p className="font-bold text-lg">{props.title}</p>
      </div>
    </div>
  );
};

export default SmallRestoListItem;
