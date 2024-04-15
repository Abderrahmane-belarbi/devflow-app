import Image from "next/image";
import Link from "next/link";

interface Props {
  icon: string;
  alt: string;
  value: string;
  title: string;
	href?: string;
  textStyle: string;
	isAuthor?: boolean
}

export default function Metric({ icon, alt, value, title, href, textStyle, isAuthor=false}: Props) {

  const metricContent = (
    <>
      <Image
      className={`object-contain ${href ? 'rounded-full' : ''}`}
      src={icon}
      width={16}
      height={16}
      alt={alt}
    />

    <p className={`${textStyle} flex items-center gap-1`}>
      {value}
      <span className={`small-regular line-clamp-1 ${isAuthor ? 'max-sm:hidden' : ''}`}> {/* ${isAuthor ? 'max-sm:hidden' : ''} if u want to hide asked ago */}
        {title}
      </span>
    </p>
    </>
  )

  if(href) {
    return (
      <Link href={href} className="flex-center gap-1">
        {metricContent}
      </Link>
    )
  }

  return <div className="flex-center flex-wrap gap-1">
		{metricContent}
	</div>;
}
