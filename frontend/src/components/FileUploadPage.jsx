import React, { useRef } from 'react';
import './LoginPage.css';
import Auth from '../services/auth.service';

const FileUploadPage = () => {
  const btn = useRef();
  const fileDescription = useRef();
  const file = useRef();

  return (
    <form className="FileUploadPage" onSubmit={(e) => {
      e.preventDefault();
      let formData = new FormData();
      formData.append("fileDesc", fileDescription.current.value);

      formData.append("files1", file.current.files[0]);
      formData.append("files2", file.current.files[0]);
      for(var pair of formData.entries()) {
        console.log(pair[0]+', '+pair[1]);
      }
      Auth.fileUpload(formData);
    }}>
      <label className='title'> 파일 업로드 </label>
      <div className="input-wrapper mb-3">
        <input type="text" className="form-control" id="fileDesc" ref={fileDescription}/>
      </div>
      <div className="input-wrapper mb-3">
        <input
          type="file"
          className="form-control"
          id="file"
          ref={file}
        />
      </div>
      <div className='blank'></div>
      <button type="submit" className="btn btn-success" ref={btn}>
        파일 업로드
      </button>
    </form>
  );
}

export default FileUploadPage;
