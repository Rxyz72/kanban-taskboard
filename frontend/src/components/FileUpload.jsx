import { useState, useRef } from "react";
import { Plus, X, FileArchive, FileText, Image as ImageIcon } from "lucide-react";

const ALLOWED_TYPES = [".zip", ".pdf", ".jpg", ".jpeg", ".png"];
const MAX_FILES = 5;

const getExtension = (filename) => "." + filename.split(".").pop().toLowerCase();

const getFileIcon = (filename) => {
   const ext = getExtension(filename);
   if (ext === ".zip") return FileArchive;
   if (ext === ".jpg" || ext === ".jpeg" || ext === ".png") return ImageIcon;
   return FileText;
};

const FileUpload = ({ taskTitle }) => {
   const [files, setFiles] = useState([]);
   const [isDragging, setIsDragging] = useState(false);
   const [error, setError] = useState("");
   const inputRef = useRef(null);

   const addFiles = (newFiles) => {
      setError("");
      const incoming = Array.from(newFiles);
      const validFiles = [];

      for (const file of incoming) {
         const ext = getExtension(file.name);
         if (!ALLOWED_TYPES.includes(ext)) {
               setError(`${file.name} — unsupported type`);
               continue;
         }
         validFiles.push(file);
      }

      setFiles((prev) => {
         const combined = [...prev, ...validFiles];
         if (combined.length > MAX_FILES) {
               setError(`Max ${MAX_FILES} files allowed`);
               return combined.slice(0, MAX_FILES);
         }
         return combined;
      });
   };

   const handleDrop = (e) => {
      e.preventDefault();
      setIsDragging(false);
      addFiles(e.dataTransfer.files);
   };

   const handleBrowse = (e) => {
      addFiles(e.target.files);
      e.target.value = "";
   };

   const removeFile = (index) => {
      setFiles((prev) => prev.filter((_, i) => i !== index));
      setError("");
   };

   return (
      <div className="flex flex-col gap-2">
         <p className="text-sm font-semibold">
               Related files <span className="font-semibold text-black">{taskTitle}</span>
         </p>

         <div className="flex flex-row gap-4">
               <div
                  onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
                  onDragLeave={() => setIsDragging(false)}
                  onDrop={handleDrop}
                  onClick={() => inputRef.current.click()}
                  className={`flex flex-col items-center justify-center gap-2 flex-1 min-w-0 h-40 rounded-xl border-2 border-dashed cursor-pointer transition-colors
                     ${isDragging ? "border-black bg-gray-100" : "border-gray-300 bg-gray-50 hover:bg-gray-100"}`}>
                  <Plus className="text-black/50" />
                  <p className="text-sm text-black/60 text-center px-2">
                     Drag files here or click to browse
                  </p>
                  <p className="text-xs text-black/40">.zip .pdf .jpg .png — max {MAX_FILES}</p>
                  <input
                     ref={inputRef}
                     type="file"
                     multiple
                     accept=".zip,.pdf,.jpg,.jpeg,.png"
                     onChange={handleBrowse}
                     className="hidden"
                  />
               </div>

               <div className="flex flex-col flex-1 min-w-0 gap-2 h-40 overflow-y-auto">
                  {files.length === 0 && (
                     <p className="text-sm text-black/40 italic m-auto">No files attached</p>
                  )}
                  {files.map((file, index) => {
                     const Icon = getFileIcon(file.name);
                     return (
                        <div
                           key={`${file.name}-${index}`}
                           className="flex flex-row items-center gap-2 bg-gray-100 rounded-lg px-3 py-2"
                        >
                           <Icon className="w-4 h-4 text-black/50 shrink-0" />
                           <p className="text-sm truncate flex-1 min-w-0">{file.name}</p>
                           <button
                              type="button"
                              onClick={() => removeFile(index)}
                              aria-label={`Remove ${file.name}`}
                              className="text-black/40 hover:text-red-500 transition-colors shrink-0"
                           >
                              <X className="w-4 h-4" />
                           </button>
                        </div>
                     );
                  })}
               </div>
         </div>

         {error && (
               <p className="text-xs text-red-500">{error}</p>
         )}
      </div>
   );
};

export default FileUpload;