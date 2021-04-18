import { useState, useRef, useEffect } from 'react';
import './App.css';

function App() {
  const [isShowDeletedText, setIsShowDeletedText] = useState(true)
  const contentEditable = useRef();

  useEffect(() => {
    window.addEventListener('load', () => {
      const editingArea = contentEditable.current;
      if (!editingArea) return;
      editingArea.addEventListener('input', e => {
        let insTagList = e.currentTarget.querySelectorAll('ins');
        if (!insTagList.length) return;
        insTagList = Array.from(insTagList);
        insTagList.forEach(e => {
          let strArray = e.innerText.split(/\s/);
          if (strArray.length > 1) {
            strArray.forEach((str, i) => {
              if (str && i !== 0) {
                const newIns = document.createElement('ins');
                const whiteSpace = document.createTextNode(' ');
                newIns.innerText = str;
                itemInsertion(newIns, e);
                itemInsertion(whiteSpace, e);
                addingWordAfterTag(newIns);
                e.innerText = strArray[0].trim();
              }
            });
          }
        });
      });
    });
  }, [])

  const addingWordAfterTag = e => {
    if (!e.childNodes[0]) return;
    e.focus()

    const range = document.createRange();
    range.setStart(e.childNodes[0], 1);
    range.setEnd(e.childNodes[0], 1);

    const selection = window.getSelection();
    selection.removeAllRanges();
    selection.addRange(range);
  }

  const itemInsertion = (newNode, referenceNode) => {
    referenceNode.parentNode.insertBefore(newNode, referenceNode.nextSibling);
  }

  return (
    <div
      contentEditable="true"
      onFocus={() => setIsShowDeletedText(false)}
      onBlur={() => setIsShowDeletedText(true)}
      ref={contentEditable}
      suppressContentEditableWarning={true}
    >
      {isShowDeletedText && <del>deleted</del>} accepted <ins>inserted</ins>
    </div>
  );
}

export default App;
