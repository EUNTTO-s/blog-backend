import React, { useRef } from 'react';
import './LoginPage.css';
import Auth from '../services/auth.service';

const InputItem = (label, id, ref, type = 'text') => {
  return (
    <>
      <label className="title" key={label}> {label} </label>
        <input
          type={type}
          className="form-control"
          id={id}
          ref={ref}
          key={id}
          />
    </>
  );
}



const CompanyUploadPage = () => {
  const btn = useRef();
  const companyId = useRef();
  const companyName = useRef();
  const companyAddress = useRef();
  const companyImgFile = useRef();
  const companyInfoFile = useRef();
  const shortDesc = useRef();
  const longDesc = useRef();
  const fastfiveBenefitDesc = useRef();
  const fastfiveBranchId = useRef();
  const homepageUrl = useRef();
  const level2CategoriesId = useRef();
  const mainBussinessTags = useRef();
  const file = useRef();

  const items = [
    {
      label: "회사 ID",
      id: "company-id",
      ref: companyId,
      type: 'text'
    },
    {
      label: "회사명",
      id: "company-name",
      ref: companyName,
      type: 'text'
    },
    {
      label: "회사 연락처",
      id: "company-address",
      ref: companyAddress,
      type: 'text'
    },
    {
      label: "회사 이미지 로고 파일",
      id: "company-logo",
      ref: companyImgFile,
      type: 'file'
    },
    {
      label: "회사 소개 파일",
      id: "company-info",
      ref: companyInfoFile,
      type: 'file'
    },
    {
      label: "회사 짧은 소개",
      id: "company-short-info",
      ref: shortDesc,
      type: 'text'
    },
    {
      label: "회사 긴 소개",
      id: "company-short-info",
      ref: longDesc,
      type: 'text'
    },
    {
      label: "패스트파이브 이득 소개",
      id: "fastfive-benefit",
      ref: fastfiveBenefitDesc,
      type: 'text'
    },
    {
      label: "패스트파이브 브랜치 아이디",
      id: "branch-id",
      ref: fastfiveBranchId,
      type: 'text'
    },
    {
      label: "홈페이지 URL",
      id: "homepage-url",
      ref: homepageUrl,
      type: 'text'
    },
    {
      label: "2차 카테고리 ID",
      id: "lvl-2-category",
      ref: level2CategoriesId,
      type: 'text'
    },
    {
      label: "태그들",
      id: "tags",
      ref: mainBussinessTags,
      type: 'text'
    },
  ]

  // setInterval(() => {
  //   summit();
  // }, 5000);

  const summit = (e) => {
    if (e) {
      e.preventDefault();
    }
    let formData = new FormData();
    formData.append("companiesId", companyId.current.value);
    formData.append("companyName", companyName.current.value);
    formData.append("companyLongDesc", longDesc.current.value);
    formData.append("companyShortDesc", shortDesc.current.value);
    formData.append("fastfiveBenefitDesc", fastfiveBenefitDesc.current.value);
    formData.append("fastfiveBranchesId", fastfiveBranchId.current.value);
    formData.append("homepageUrl", homepageUrl.current.value);
    formData.append("level2CategoriesId", level2CategoriesId.current.value);
    formData.append("mainBussinessTags", mainBussinessTags.current.value);
    formData.append("companyContactAddress", companyAddress.current.value);
    formData.append("companyInfoUrl", companyInfoFile.current.files[0]);
    formData.append("companyImgUrl", companyImgFile.current.files[0]);

    for (var pair of formData.entries()) {
      console.log(pair[0] + ", " + pair[1]);
    }
    Auth.PostUpload(formData);
  };

  return (
    <form
      className="CompanyUploadPage"
      onSubmit={summit}
    >
      <label className="title"> 파일 업로드 </label>
      <br />
      <br />

      <div className="input-wrapper mb-3">
        {items.map((item) =>
          InputItem(item.label, item.id, item.ref, item.type)
        )}

      </div>
      <div className="blank"></div>
      <button type="submit" className="btn btn-success" ref={btn}>
        파일 업로드
      </button>
    </form>
  );
}

export default CompanyUploadPage;
