import React, {useEffect, useState} from "react";
import {useHttp} from "../../hooks/http.hook"
import MySelect from "../../components/MySelect";

export default function FilesPage() {
    const {loading, error, request, clearError} = useHttp()

    const [folders, setFolders] = useState([
        {
            name: 'Folder 1',
            files: [
                { name: 'file1.txt', size: '10 KB' },
                { name: 'image.jpg', size: '500 KB' }
            ]
        },
        {
            name: 'Folder 2',
            files: [
                { name: 'document.pdf', size: '2 MB' }
            ]
        }
    ]);

    const handleFileDelete = (folderIndex, fileIndex) => {
        const newFolders = [...folders];
        newFolders[folderIndex].files.splice(fileIndex, 1);
        setFolders(newFolders);
    };

    const handleFolderDelete = (folderIndex) => {
        const newFolders = [...folders];
        newFolders.splice(folderIndex, 1);
        setFolders(newFolders);
    };
    return (
        <div className="files">
            <h1>FilesCloud</h1>
            {folders.map((folder, folderIndex) => (
                <div key={folderIndex}>
                    <h2>{folder.name}</h2>
                    <div className="file-list">
                        {folder.files.map((file, fileIndex) => (
                            <div key={fileIndex} className="file-item">
                                <span>{file.name}</span>
                                <span>{file.size}</span>
                                <button onClick={() => handleFileDelete(folderIndex, fileIndex)}>Удалить файл</button>
                            </div>
                        ))}
                    </div>
                    <button onClick={() => handleFolderDelete(folderIndex)}>Удалить папку</button>
                </div>
            ))}
        </div>
    )

}