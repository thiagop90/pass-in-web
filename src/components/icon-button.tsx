import { Button, ButtonProps } from './ui/button'

export function IconButton(props: ButtonProps) {
  return <Button type="button" size="icon" variant="secondary" {...props} />
}
