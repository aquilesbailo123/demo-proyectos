
import './DocumentViewer.css'

interface DocumentViewerProps {
    /** Url for the document */ 
    documentUrl?: string
}

const DocumentViewer = ({ documentUrl }: DocumentViewerProps) => {
    return (
        <div className="document-viewer-cont">
            <img 
                className="document-image-cont" 
                src={documentUrl ? documentUrl : ''} 
                alt="Medical document"
            />
        </div>
    )
}

export default DocumentViewer