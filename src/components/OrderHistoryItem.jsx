import waysfoodIco from '/nav-Icon.svg';

const OrderHistoryItem = (props) => {
  return (
    <div className="p-2 w-4/5 bg-white shadow-lg flex justify-between mb-3">
      <div>
        <h4 className="font-bold text-lg">{props.title}</h4>
        <p className="text-sm">{props.date}</p>
        <p className="text-zinc-700 font-bold">Total : {props.totalPrice}</p>
      </div>
      <div className="text-end">
        <img src={waysfoodIco} alt="" className="mb-2" />
        <div className={`text-center font-bold uppercase ${props.status === 'success' ? 'bg-green-500/30 text-green-600' : 'bg-red-500/30 text-black'}`}>
          <p>{props.status}</p>
        </div>
      </div>
    </div>
  );
};

export default OrderHistoryItem;
