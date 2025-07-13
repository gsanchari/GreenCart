import React, { useState } from 'react';
import  { assets,categories } from "../../assets/assets"

const AddProduct = () => {
  const [files, setFiles] = useState([]);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [price, setPrice] = useState('');
  const [offerPrice, setOfferPrice] = useState('');

  const onSubmitHandler = async (event)=>{
    event.preventDefault();
  }

  return (
    <>
      <div className="add-product-container">
        <form onSubmit={onSubmitHandler} className="add-product-form">
          <div>
            <p className="label">Product Image</p>
            <div className="image-upload-area">
              {Array(4).fill('').map((_, index) => (
                <label key={index} htmlFor={`image${index}`}>
                  <input onChange={(e)=>{
                        const updatedFiles = [...files];
                        updatedFiles[index] =e.target.files[0]
                        setFiles(updatedFiles)
                      }}  accept="image/*" type="file" id={`image${index}`} hidden />
                  <img
                    className="upload-preview"
                    src={files[index] ? URL.createObjectURL(files[index]) : assets.upload_area}
                    alt="uploadArea"
                    width={100}
                    height={100}
                  />
                </label>
              ))}
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="product-name" className="label">Product Name</label>
            <input onChange={(e)=>setName(e.target.value)} value={name}
              id="product-name"
              type="text"
              placeholder="Type here"
              required
              className="input-field"
            />
          </div>

          <div className="form-group">
            <label htmlFor="product-description" className="label">Product Description</label>
            <textarea
              id="product-description"
              rows={4}
              placeholder="Type here"
              className="input-field textarea"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            ></textarea>
          </div>

          <div className="form-group">
            <label htmlFor="category" className="label">Category</label>
            <select
              id="category"
              className="input-field"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              <option value="">Select Category</option>
                {categories.map(()=>(
                  <option key={index} value={item.path}>{item.path}</option>
                ))}
            </select>
          </div>

          <div className="price-fields">
            <div className="form-group small">
              <label htmlFor="product-price" className="label">Product Price</label>
              <input
                id="product-price"
                type="number"
                placeholder="0"
                className="input-field"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                required
              />
            </div>

            <div className="form-group small">
              <label htmlFor="offer-price" className="label">Offer Price</label>
              <input
                id="offer-price"
                type="number"
                placeholder="0"
                className="input-field"
                value={offerPrice}
                onChange={(e) => setOfferPrice(e.target.value)}
                required
              />
            </div>
          </div>

          <button type="submit" className="submit-button">ADD</button>
        </form>
      </div>

      <style>{`
        .add-product-container {
          flex: 1;
          height: 95vh;
          overflow-y: auto;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
        }

        .add-product-form {
          padding: 1rem;
          max-width: 640px;
          display: flex;
          flex-direction: column;
          gap: 1.25rem;
        }

        @media (min-width: 768px) {
          .add-product-form {
            padding: 2.5rem;
          }
        }

        .label {
          font-size: 1rem;
          font-weight: 500;
        }

        .image-upload-area {
          display: flex;
          flex-wrap: wrap;
          gap: 0.75rem;
          margin-top: 0.5rem;
          align-items: center;
        }

        .upload-preview {
          max-width: 6rem;
          cursor: pointer;
        }

        .form-group {
          display: flex;
          flex-direction: column;
          gap: 0.25rem;
          max-width: 100%;
        }

        .input-field {
          padding: 0.5rem 0.75rem;
          border-radius: 0.375rem;
          border: 1px solid rgba(107, 114, 128, 0.4);
          outline: none;
        }

        @media (min-width: 768px) {
          .input-field {
            padding: 0.625rem 0.75rem;
          }
        }

        .textarea {
          resize: none;
        }

        .price-fields {
          display: flex;
          flex-wrap: wrap;
          gap: 1rem;
          align-items: flex-start;
        }

        .form-group.small {
          flex: 1;
          min-width: 8rem;
        }

        .submit-button {
          padding: 0.6rem 1.5rem;
          background-color: #4fbf8b;
          color: white;
          font-weight: 500;
          border: none;
          border-radius: 6px;
          font-size: 1rem;
          cursor: pointer;
          width: 110px;
        }

        .submit-button:hover {
          background-color:  #c6f2e9;
          color:black;
        }
      `}</style>
    </>
  );
};

export default AddProduct;
