import { useState, useRef } from "react";

function Verification() {
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [dragging, setDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setDragging(true);
  };

  const handleDragLeave = () => {
    setDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragging(false);

    const file = e.dataTransfer.files[0];
    if (file) {
      setUploadedFile(file);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setUploadedFile(file);
    }
  };

  const handleClick = () => {
    fileInputRef.current?.click();
  };
  return (
    // <ScreenLayout>
    <div className=" p-3">
      <div className="max-w-2xl mx-auto p-6  rounded-lg shadow-2xl border border-t-blue-500">
        <h1 className="text-2xl font-bold mb-4">Welcome 👋</h1>
        <p className="text-muted-foreground mb-6">
          Let us know more about yourself
        </p>
        <h2 className="text-xl font-semibold mb-2">Personal Information</h2>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-muted-foreground">
              Full name:
            </label>
            <input
              type="text"
              className="mt-1 block w-full p-2 border bg-gray-100 border-border rounded-md"
              placeholder="Ikechukwu Abaleke"
            />
          </div>
          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="block text-sm font-medium text-muted-foreground">
                Email Address:
              </label>
              <input
                type="email"
                className="mt-1 block w-full p-2 border  bg-gray-100 border-border rounded-md"
                placeholder="ikechukwuabaleke29@gmail.com"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-muted-foreground">
                Phone Number:
              </label>
              <input
                type="tel"
                className="mt-1 block w-full p-2 border  bg-gray-100 border-border rounded-md"
                placeholder="+234 8147246757"
              />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="block text-sm font-medium text-muted-foreground">
                Date of Birth:
              </label>
              <input
                type="date"
                className="mt-1 block w-full p-2 border  bg-gray-100 border-border rounded-md"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-muted-foreground">
                Gender:
              </label>
              <select className="mt-1 block w-full p-2  bg-gray-100 border border-border rounded-md">
                <option>Male</option>
                <option>Female</option>
                <option>Other</option>
              </select>
            </div>
          </div>
        </div>

        <h2 className="text-xl font-semibold mt-6 mb-2">
          Identification and Verification
        </h2>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-muted-foreground">
              LinkedIn Profile:
            </label>
            <input
              type="url"
              className="mt-1 block w-full p-2 border border-border rounded-md"
              placeholder="https://linkedin.com/in/profile"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-muted-foreground">
              Identification Type:
            </label>
            <select className="mt-1 block w-full p-2 border border-border rounded-md">
              <option>Identity Verification</option>
              <option>Passport</option>
              <option>Driver's License</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-muted-foreground">
              Identification Number:
            </label>
            <input
              type="text"
              className="mt-1 block w-full p-2 border border-border rounded-md"
              placeholder="123A-456L-789B"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-muted-foreground">
              Upload Identification Documents:
            </label>
            <div
              className={`mt-1 border border-dashed ${
                dragging ? "border-blue-500" : "border-border"
              } rounded-md p-4 bg-gray-50 text-center cursor-pointer`}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              onClick={handleClick}
            >
              <input
                type="file"
                ref={fileInputRef}
                className="hidden"
                onChange={handleFileChange}
              />
              {uploadedFile ? (
                <p className="text-foreground">
                  {uploadedFile.name} uploaded successfully
                </p>
              ) : (
                <>
                  <p className="text-muted-foreground">
                    Click to upload or drag and drop
                  </p>
                  <p className="text-sm text-muted-foreground">
                    SVG, PNG, JPG, or GIF (max 800x400px)
                  </p>
                </>
              )}
            </div>
          </div>
        </div>
        <div>
          <h1 className="text-2xl font-bold text-foreground mb-4 mt-6">
            Consent and Privacy
          </h1>

          <h2 className="text-lg font-semibold text-foreground mt-4">
            Data Usage Consent
          </h2>
          <p className="text-muted-foreground mb-4">
            By using CuraFlux, both hospitals and medical professionals consent
            to the collection, processing, and storage of their personal
            undefined solely for the purposes of shift matching, communication,
            and service optimization. CuraFlux ensures that all undefined is
            securely handled in compliance with applicable privacy regulations.
          </p>

          <h2 className="text-lg font-semibold text-foreground mt-4">
            Confidentiality of Medical Practitioner Information
          </h2>
          <p className="text-muted-foreground mb-4">
            Hospitals agree to maintain the confidentiality of any personal
            information or credentials shared by medical professionals through
            CuraFlux. This information will be used strictly for shift
            management purposes and cannot be disclosed to third parties without
            prior consent.
          </p>

          <h2 className="text-lg font-semibold text-foreground mt-4">
            Shift and Work History Privacy
          </h2>
          <p className="text-muted-foreground mb-4">
            Medical professionals have full control over their work history and
            shift availability undefined on CuraFlux. Hospitals may only view
            the undefined required for matching available shifts, while CuraFlux
            ensures that personal information and work history remain private
            unless explicitly shared by the medical professional.
          </p>

          <div className="flex items-center mb-4">
            <input type="checkbox" id="consent" className="mr-2" />
            <label htmlFor="consent" className="text-muted-foreground">
              I acknowledge that I have reviewed and agree to the{" "}
              <a href="#" className="text-primary">
                Consent and Privacy
              </a>{" "}
              policy.
            </label>
          </div>

          <button className="bg-blue-500  text-primary-foreground hover:bg-primary/80 p-2 rounded-lg w-full">
            Finish
          </button>
        </div>
      </div>
    </div>
    // </ScreenLayout>
  );
}

export default Verification;
