import { photoUrl } from '../data'

export default function Photo({ id, alt = '', ratio = 1, width = 800, sizes, eager = false, ...rest }) {
  const widths = [Math.round(width / 2), width, width * 2]
  return (
    <img
      src={photoUrl(id, width, ratio)}
      srcSet={widths.map((w) => `${photoUrl(id, w, ratio)} ${w}w`).join(', ')}
      sizes={sizes}
      alt={alt}
      width={width}
      height={Math.round(width / ratio)}
      loading={eager ? 'eager' : 'lazy'}
      fetchPriority={eager ? 'high' : undefined}
      decoding="async"
      draggable="false"
      {...rest}
    />
  )
}
