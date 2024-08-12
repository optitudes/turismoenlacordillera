
export default function MicrositeInfo1({bannerUrl,name,description}){
    return (
        <div className="flex py-9 px-9 grid  sm:grid-cols-2 grid-cols-1 ">
        <div className="w-7/10 flex-shrink-0">
          <Image
            image={bannerUrl}
            alt="Descripción de la imagen"
            objectCover="object-cover"
            className="w-full lg:h-96  h-60"  // Ajusta la altura según sea necesario
          />
        </div>
        <div className="w-3/10 flex flex-col justify-center sm:px-9 px-1 align-top py-9">
          <h2 className="text-xl font-semibold text-white text-center">{name}</h2>
          <div className="flex-1 overflow-y-auto lg:max-h-96   max-h-60">
            <p className="text-sm md:text-base text-white leading-relaxed text-justify">{description}</p>
          </div>    
        </div>
      </div>
    );
}