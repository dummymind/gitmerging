import React, { useState, useEffect } from 'react';
import calendaricon from '../../images/vector_x2.svg';
import { NavLink } from 'react-router-dom';
import useFormContext from "./useFormContext.js"

const History = () => {

  const { eventFormData, handleChange } = useFormContext()

  const content = (

    <div>

      <div className="col-md-10 mb-5">
        <div className=" bg-light rounded p-3 mt-3">
          <div className="form-group row mb-2 align-items-center">
            <label
              htmlFor="staticEmail"
              className="custom-font col-sm-2 col-form-label"
            >
              04/04/2024
            </label>
            <div className="col-sm-2 ">
              <strong>
                <input
                  type="text"
                  className="custom-font-lt form-control-plaintext-cus form-control-plaintext"
                  id="staticEmail"
                  placeholder="Jason RIPPER"
                />
              </strong>
              <input
                type="text"
                className="custom-font-lt form-control-plaintext-cus form-control-plaintext "
                id="staticEmail"
                placeholder="Visit Requester"
              />
            </div>
          </div>
          <div className="form-group row mb-2">
            <div className="col-sm-12 ">
              <input
                type="text"
                readOnly=""
                className="custom-font-lt form-control"
                id="staticEmail"
                placeholder="Draft created"
              />
            </div>
          </div>
          <div className="form-group row mb-2 align-items-center">
            <div className="col-sm-9 pr-0">
              <input
                type="text"
                readOnly=""
                className="custom-font-lt form-control"
                id="staticEmail"
                placeholder="Leave a comment"
              />
            </div>
            <div className="col-sm-3 pl-0">
              <button type="button" className="buttonrequest btn btn-success ml-2">
                SEND YOUR MESSAGE{" "}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
  return content
}


export default History;