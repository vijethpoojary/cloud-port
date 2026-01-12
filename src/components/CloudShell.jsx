import { useState } from 'react'
import Terminal from './Terminal'
import FileEditor from './FileEditor'

const CloudShell = ({ isOpen, onClose }) => {
  const [editingFile, setEditingFile] = useState(null)
  const [fileContent, setFileContent] = useState('')
  const [saveCallback, setSaveCallback] = useState(null)

  const handleEditFile = (filename, content, onSave, onCancel) => {
    setEditingFile(filename)
    setFileContent(content)
    setSaveCallback(() => onSave)
  }

  const handleSaveFile = (newContent) => {
    if (saveCallback) {
      saveCallback(newContent)
    }
    setEditingFile(null)
    setFileContent('')
    setSaveCallback(null)
  }

  const handleCancelEdit = () => {
    setEditingFile(null)
    setFileContent('')
    setSaveCallback(null)
  }

  return (
    <>
      <Terminal
        isOpen={isOpen}
        onClose={onClose}
        onEditFile={handleEditFile}
      />
      {editingFile && (
        <FileEditor
          filename={editingFile}
          content={fileContent}
          onSave={handleSaveFile}
          onCancel={handleCancelEdit}
        />
      )}
    </>
  )
}

export default CloudShell

