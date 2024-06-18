const ActionButton = ({imageURL, text, ...otherProps}) => {
  return (
    <div {...otherProps}>
      <img alt={imageURL} src={imageURL} width={96} height={96} />
      <p className='mt-2'>{text}</p>
    </div>
  )
}

export default ActionButton;