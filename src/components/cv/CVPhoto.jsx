export default function CVPhoto({ src, className = '', alt = 'Profile' }) {
  if (!src) return null
  return (
    <img
      src={src}
      alt={alt}
      className={`object-cover ${className}`}
    />
  )
}
