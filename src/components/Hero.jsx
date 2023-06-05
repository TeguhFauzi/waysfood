import pizzaIcon from '/img/pizza-logo.png';

const Hero = () => {
  return (
    <div className="bg-yellow-300 px-8 pt-20 pb-10">
      <div className="container mx-auto text-zinc-800">
        <div className="px-44 flex justify-between mx-auto">
          <div className="w-1/2 my-auto">
            <p className="text-6xl font-bold">Are You Hungry ?</p>
            <p className="text-6xl font-bold">Express Home Deliver</p>
            <div className="flex gap-x-5 mt-10">
              <div className="w-1/3 h-1 bg-black mt-2"></div>
              <p className="w-2/3">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.</p>
            </div>
          </div>
          <div className="pl-20 w-1/2">
            <img src={pizzaIcon} alt="" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
