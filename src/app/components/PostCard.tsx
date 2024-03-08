
export const PostCard = () => {
  const textSliced = "El rápido zorro marrón salta sobre el perro perezoso que duerme en el sofá mientras los pájaros cantan afuera.".slice(0,70)
  return <>
    <div className="w-72 h-80 flex flex-col justify-between items-center gap-4 p-3 bg-gray-900 rounded shadow-white hover:shadow-selected cursor-pointer">
      <h2 className="text-xl font-semibold text-center">Este es un titulo muy chido con muchos caracteres</h2>
      <p className="w-full text-base">{textSliced}</p>
      <div className="w-full flex flex-col gap-1">
        <span className="text-sm font-light text-gray-300">Tonatiuh Jimenez Sanchez</span>
        <span className="text-xs font-light text-gray-300">Creado: 20/11/2024</span>
        <span className="text-xs font-light text-gray-300">Editado: 20/11/2024</span>
      </div>
    </div>  
  </>
}
