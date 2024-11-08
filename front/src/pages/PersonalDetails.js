import React, { useState, useEffect, useContext } from 'react';
import { FormContext } from '../context/FormContext.js';
import { savePersonalDetails, getClientDetails } from '../services/formService';


const PersonalDetails = () => {

    const {formData, updateFormData} = useContext(FormContext);
    const [localFormData, setFormData] = useState(formData.personalDetails ||{
        title: '',
        firstName: '',
        middleName: '',
        lastName: '',
        dateOfBirth: '',
        placeOfBirth: '',
        gender: '',
        maritalStatus: '',
        phone: '',
        mobile: '',
    });

    // Synchronize local state with context when the component mounts
    useEffect(() => {
        // Only set state if context has data to avoid overwriting with empty data
        if (formData.personalDetails) {
            setFormData(formData.personalDetails);
        } else {
        // Optionally, fetch saved data from the backend if context is empty
        const fetchData = async () => {
            try {
            const data = await getClientDetails(); // Fetch data from the backend
            if (data.personalDetails) {
                setFormData(data.personalDetails);
                updateFormData('personalDetails', data.personalDetails);
            }
            } catch (error) {
            console.error('Error fetching client details:', error);
            }
        };

        fetchData();
        }
    }, [formData.personalDetails, updateFormData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async () => {
    try {
      // Save to context first
      updateFormData('personalDetails', localFormData);

      // Save to backend using Axios
      const response = await savePersonalDetails(localFormData);
      console.log('Personal details saved successfully:', response);
    } catch (error) {
      console.error('Error saving personal details:', error);
    }
  };


  return (
    <div className="personal-details">
      <h2>Personal Details</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Title:
          <select name="title" value={formData.title} onChange={handleChange}>
            <option value="">Select</option>
            <option value="Mr">Mr</option>
            <option value="Mrs">Mrs</option>
            <option value="Miss">Miss</option>
          </select>
        </label>
        <label>
          First Name:
          <input type="text" name="firstName" value={formData.firstName} onChange={handleChange} required />
        </label>
        <label>
          Middle Name:
          <input type="text" name="middleName" value={formData.middleName} onChange={handleChange} />
        </label>
        <label>
          Last Name:
          <input type="text" name="lastName" value={formData.lastName} onChange={handleChange} required />
        </label>
        <label>
          Date of Birth:
          <input type="date" name="dateOfBirth" value={formData.dateOfBirth} onChange={handleChange} required />
        </label>
        <label>
          Place of Birth:
          <input type="text" name="placeOfBirth" value={formData.placeOfBirth} onChange={handleChange} />
        </label>
        <label>
          Gender:
          <div>
            <label>
              <input type="radio" name="gender" value="Male" checked={formData.gender === 'Male'} onChange={handleChange} />
              Male
            </label>
            <label>
              <input type="radio" name="gender" value="Female" checked={formData.gender === 'Female'} onChange={handleChange} />
              Female
            </label>
          </div>
        </label>
        <label>
          Marital Status:
          <input type="text" name="maritalStatus" value={formData.maritalStatus} onChange={handleChange} />
        </label>
        <label>
          Phone:
          <input type="tel" name="phone" value={formData.phone} onChange={handleChange} />
        </label>
        <label>
          Mobile:
          <input type="tel" name="mobile" value={formData.mobile} onChange={handleChange} />
        </label>
        <button type="submit" onClick={handleSubmit}>Save</button>
      </form>
    </div>
  );
};

export default PersonalDetails;
