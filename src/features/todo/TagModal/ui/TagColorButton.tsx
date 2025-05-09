import Image from 'next/image';
import Plus from '@/image/plus.png';

interface PropsType {
    onClick?: React.MouseEventHandler<HTMLButtonElement> | undefined;
    color: string;
    status: boolean;
}

export default function TagColorButton(data: PropsType) {

    const borderClass = data.color
        ? `border-${data.color}-600`
        : 'border-stone-600';
    const bgClass = data.color ? `bg-${data.color}-100` : 'bg-stone-100';
    const textClass = data.color
        ? `text-${data.color}-600`
        : 'text-stone-600';

    const borderWidth = data.status ? 'border-2' : 'border'

    return (
        <button className={`${borderClass} ${borderWidth} ${bgClass} ${textClass} w-[25px] h-[25px] rounded-full`} onClick={data.onClick} />
    );
}
