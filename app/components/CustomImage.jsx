import Image from '@tiptap/extension-image'

export const CustomImage = Image.extend({
  addAttributes() {
    return {
      ...this.parent?.(),

      width: {
        default: 'auto',
        parseHTML: element => element.getAttribute('width'),
        renderHTML: attributes => {
          return { width: attributes.width }
        }
      },

      class: {
        default: 'mx-auto my-4 rounded-lg',
      }
    }
  }
})