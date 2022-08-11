import React, { Fragment, useState } from 'react';
import { useHistory } from 'react-router-dom'

function EditProfile() {    
    const [editDeleted, setEditDeleted] = useState(false)
    const [editFirstName, setEditFirstName] = useState("");
    const [lastName, setEditLastName] = useState("");
    const [editEmail, setEditEmail] = useState("");
    const [editUserNameString, setEditUserNameString] = useState("");
    const [editPasswordString, setEditPasswordString] = useState("");
    const [editConfirmPasswordString, setEditConfirmPasswordString] = useState("");

    const history = useHistory();
  return (
    <Fragment>
<div class="container">
  	<hr />
	<div class="row">
      {/* <!-- left column --> */}
      <div class="col-md-3">

      </div>
      
      {/* <!-- edit form column --> */}
      <div class="col-md-9 personal-info">
        <h1>Edit Profile</h1>
        
          {editDeleted ? null : <Fragment><div class="alert alert-info alert-dismissable"><a class="panel-close close" data-dismiss="alert" onClick={() => {
            return setEditDeleted(true);
          }}>×</a> 
          <i class="fa fa-coffee"></i>
          Edit this section to change your <strong>personal information</strong> 
          </div>
          </Fragment>
          }

        <h3>Personal info</h3>
        
        <form class="form-horizontal" role="form">
          <div class="form-group">
            <label class="col-lg-4 control-label">First name:</label>
            <div class="col-lg-8">
              <input class="form-control" type="text" value={editFirstName}
                      onChange={async (e) => {
                        setEditFirstName(e.target.value);
                      }}
              />
            </div>
          </div>
          <div class="form-group">
            <label class="col-lg-3 control-label">Last name:</label>
            <div class="col-lg-8">
              <input class="form-control" type="text" value={lastName}
                                 onChange={async (e) => {
                                    setEditLastName(e.target.value);
                                  }}
              />
            </div>
          </div>
          <div class="form-group">
            <label class="col-lg-3 control-label">Email:</label>
            <div class="col-lg-8">
              <input class="form-control" type="email" value={editEmail}
              onChange={async (e) => {
                setEditEmail(e.target.value);
              }}
              />
            </div>
          </div>
          <div class="form-group" onSubmit={''}>
            <label class="col-lg-3 control-label">Time Zone:</label>
            <div class="col-lg-8">
              <div class="ui-select">
                <select id="user_time_zone" class="form-control">
                  <option value="Hawaii">(GMT-10:00) Hawaii</option>
                  <option value="Alaska">(GMT-09:00) Alaska</option>
                  <option value="Pacific Time (US &amp; Canada)">(GMT-08:00) Pacific Time (US &amp; Canada)</option>
                  <option value="Arizona">(GMT-07:00) Arizona</option>
                  <option value="Mountain Time (US &amp; Canada)">(GMT-07:00) Mountain Time (US &amp; Canada)</option>
                  <option value="Central Time (US &amp; Canada)" selected="selected">(GMT-06:00) Central Time (US &amp; Canada)</option>
                  <option value="Eastern Time (US &amp; Canada)">(GMT-05:00) Eastern Time (US &amp; Canada)</option>
                  <option value="Indiana (East)">(GMT-05:00) Indiana (East)</option>
                </select>
              </div>
            </div>
          </div>
          <div class="form-group">
            <label class="col-md-3 control-label">Username:</label>
            <div class="col-md-8">
              <input class="form-control" type="text" value={editUserNameString}
                onChange={async (e) => {
                    setEditUserNameString(e.target.value);
                  }}
              />
            </div>
          </div>
          <div class="form-group">
            <label class="col-md-3 control-label">Password:</label>
            <div class="col-md-8">
              <input class="form-control" type="password" value={editPasswordString}
              onChange={async (e) => {
                setEditPasswordString(e.target.value);
              }}
              />
            </div>
          </div>
          <div class="form-group">
            <label class="col-md-3 control-label">Confirm password:</label>
            <div class="col-md-8">
              <input class="form-control" type="password" value={editConfirmPasswordString}
              onChange={async (e) => {
                setEditConfirmPasswordString(e.target.value);
              }}
              />
            </div>
          </div>
          <div class="form-group">
            <label class="col-md-3 control-label"></label>
            <div class="col-md-8">
              <input type="submit" class="btn btn-primary" value="Save Changes" />
              <span></span>
              <input type="reset" class="btn btn-default" value="Cancel" onClick={
                () => {
                    return history.push('/account');
                }
              }/>
            </div>
          </div>
        </form>
      </div>
<hr/><hr />
  </div>
</div>
</Fragment>
  )
}

export default EditProfile;
