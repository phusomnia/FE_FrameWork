type CustomButtonProps = {
    color: string
    onClick: () => void
    children: React.ReactNode
}

const COLOR_CLASSES: Record<CustomButtonProps['color'], string> = {
  blue: 'bg-blue-500 hover:bg-blue-700',
  red: 'bg-red-500 hover:bg-red-700',
  green: 'bg-green-500 hover:bg-green-700',
  yellow: 'bg-yellow-500 hover:bg-yellow-700',
};

export default function CustomButton(prop: CustomButtonProps) {
    console.log(prop.color)
    return <>
        <button
            className={`${COLOR_CLASSES[prop.color]} text-white font-bold py-2 px-4 rounded`}
            onClick={prop.onClick}
            >{prop.children}</button>
    </>
}