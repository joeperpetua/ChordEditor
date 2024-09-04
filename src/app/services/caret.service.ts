import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CaretService {
  public static getCaretPosition(target: HTMLElement): number {
    if (target.contentEditable) {
        target.focus();
        let _sel = document.getSelection();
        if (!_sel) 
            return -1;
        let _range = _sel.getRangeAt(0);
        let range = _range.cloneRange()
        range.selectNodeContents(target)
        range.setEnd(_range.endContainer, _range.endOffset)
        return range.toString().length;
    }
    // for texterea/input element
    const _target = target as HTMLInputElement | HTMLTextAreaElement;
    return _target.selectionStart || -1;
  }

  public static setCaretPosition(target: HTMLElement, pos: number): void{
      if (target.contentEditable) {
          target.focus()
          const selection = document.getSelection();
          if (!selection)
              return
          // Find the text node inside the target
          const textNode = target.firstChild;
          if (!textNode || textNode.nodeType !== Node.TEXT_NODE) 
              return;
          // Ensure the position does not exceed the text length
          const caretPosition = Math.min(pos, textNode.textContent?.length || 0);

          // Collapse the selection at the correct position
          selection.collapse(textNode, caretPosition);
          return
      }
      const _target = target as HTMLInputElement | HTMLTextAreaElement;
      _target.setSelectionRange(pos, pos);
  }
  constructor() { }
}
