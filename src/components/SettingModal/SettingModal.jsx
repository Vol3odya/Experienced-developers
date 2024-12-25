import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import Loader from "../Loader/Loader";

import {
  updateUser,
  updateUserAvatar,
  fetchUser,
} from "../../redux/user/operations";
import { selectUser } from "../../redux/user/selectors";
import styles from "./SettingModal.module.css";
import { refreshUser } from "../../redux/auth/operations";

const SettingModal = ({ onClose }) => {
  const dispatch = useDispatch();
  const userData = useSelector(selectUser);

  const [formData, setFormData] = useState({
    photo: "",
    gender: "female",
    name: "",
    email: "",
    outdatePassword: "",
    newPassword: "",
    repeatPassword: "",
  });

  const [isLoading, setIsLoading] = useState(true); // Добавляем состояние загрузки

  useEffect(() => {
    setIsLoading(true);
    dispatch(fetchUser())
      .unwrap()
      .then(() => dispatch(refreshUser()))
      .catch((error) => {
        console.error("Error fetching user data:", error);
        toast.error("Failed to fetch user data!");
      })
      .finally(() => setIsLoading(false));
  }, [dispatch]);

  useEffect(() => {
    if (userData && Object.keys(userData).length > 0) {
      setFormData((prev) => ({
        ...prev,
        photo: userData.photo || prev.photo, // Обновляем с учетом корректного поля
        gender: userData.gender || prev.gender,
        name: userData.name || prev.name,
        email: userData.email || prev.email,
      }));
    }
  }, [userData]);

  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === "Escape") {
        onClose();
      }
    };
    window.addEventListener("keydown", handleEscape);

    return () => {
      window.removeEventListener("keydown", handleEscape);
    };
  }, [onClose]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value || "" }));
  };

  const handlePhotoUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const previewURL = URL.createObjectURL(file);
      setFormData((prev) => ({ ...prev, photo: previewURL, photoFile: file }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setIsLoading(true);

    if (formData.newPassword && !formData.outdatePassword) {
      toast.error("Please enter your current password to set a new password!");
      return;
    }

    if (
      formData.newPassword &&
      formData.newPassword !== formData.repeatPassword
    ) {
      toast.error("New passwords do not match!");
      return;
    }

    if (formData.newPassword && formData.newPassword.length < 6) {
      toast.error("New password must be at least 6 characters long!");
      return;
    }

    const promises = [];

    if (formData.photoFile) {
      const avatarData = new FormData();
      avatarData.append("photo", formData.photoFile);

      promises.push(
        dispatch(updateUserAvatar(avatarData))
          .unwrap()
          .then((avatarResponse) => {
            setFormData((prev) => ({ ...prev, photo: avatarResponse }));
          })
          .catch((error) => {
            console.error("Error updating avatar:", error);
            toast.error("Failed to update avatar!");
          })
      );
    }

    const updatedData = Object.fromEntries(
      Object.entries({
        name: formData.name,
        email: formData.email,
        gender: formData.gender,
        outdatePassword: formData.outdatePassword,
        password: formData.newPassword, // Приводим к ожидаемому сервером имени
      }).filter(([, value]) => value !== "")
    );

    console.log("Отправляемые данные:", updatedData);

    promises.push(
      dispatch(updateUser(updatedData))
        .unwrap()
        .then(() => {
          toast.success("Profile updated successfully!");
        })
        .catch((error) => {
          console.error("Error updating profile:", error);
          toast.error("Failed to update profile!");
        })
    );

    // Ждем когда промис завершится
    Promise.all(promises)
      .then(() => {
        dispatch(refreshUser());
        dispatch(fetchUser());
        onClose();
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const handleGenderChange = (e) => {
    const selectedGender = e.target.value; // Получаем выбранное значение
    setFormData((prev) => ({ ...prev, gender: selectedGender })); // Обновляем локальное состояние
  };

  const [passwordVisibility, setPasswordVisibility] = useState({
    outdatePassword: false,
    newPassword: false,
    repeatPassword: false,
  });

  const togglePasswordVisibility = (field) => {
    setPasswordVisibility((prev) => ({
      ...prev,
      [field]: !prev[field],
    }));
  };

  return (
    <>
      {/* SVG Sprites */}
      <svg style={{ display: "none" }}>
        <symbol id="icon-x-mark" viewBox="0 0 32 32">
          <path
            fill="none"
            stroke="#407bff"
            strokeLinejoin="round"
            strokeLinecap="round"
            strokeMiterlimit="4"
            strokeWidth="2"
            d="M8 24l16-16M8 8l16 16"
          />
        </symbol>
        <symbol id="icon-arrow-up-tray" viewBox="0 0 32 32">
          <path
            fill="none"
            stroke="#407bff"
            strokeLinejoin="round"
            strokeLinecap="round"
            strokeMiterlimit="4"
            strokeWidth="2"
            d="M4 22v3c0 1.657 1.343 3 3 3v0h18c1.657 0 3-1.343 3-3v0-3M10 10l6-6M16 4l6 6M16 4v18"
          />
        </symbol>
        <symbol id="icon-touch" viewBox="0 0 32 32">
          <path
            fill="#fff"
            style={{
              fill: "var(--color1, #fff)",
              stroke: "var(--color2, #407bff)",
            }}
            stroke="#407bff"
            strokeLinejoin="miter"
            strokeLinecap="butt"
            strokeMiterlimit="4"
            strokeWidth="2.2857"
            d="M30.857 16c0 8.205-6.652 14.857-14.857 14.857s-14.857-6.652-14.857-14.857c0-8.205 6.652-14.857 14.857-14.857s14.857 6.652 14.857 14.857z"
          />
        </symbol>
        <symbol id="icon-touch1" viewBox="0 0 32 32">
          <path
            fill="#fff"
            style={{
              fill: "var(--color1, #fff)",
              stroke: "var(--color2, #407bff)",
            }}
            stroke="#407bff"
            strokeLinejoin="miter"
            strokeLinecap="butt"
            strokeMiterlimit="4"
            strokeWidth="2.2857"
            d="M30.857 16c0 8.205-6.652 14.857-14.857 14.857s-14.857-6.652-14.857-14.857c0-8.205 6.652-14.857 14.857-14.857s14.857 6.652 14.857 14.857z"
          />
          <path
            fill="#407bff"
            style={{ fill: "var(--color2, #407bff)" }}
            d="M22.857 16c0 3.787-3.070 6.857-6.857 6.857s-6.857-3.070-6.857-6.857c0-3.787 3.070-6.857 6.857-6.857s6.857 3.070 6.857 6.857z"
          />
        </symbol>
        <symbol id="icon-eye-slash-1" viewBox="0 0 32 32">
          <path
            fill="none"
            stroke="#407bff"
            style={{ stroke: "var(--color1, #407bff)" }}
            strokeLinejoin="round"
            strokeLinecap="round"
            strokeMiterlimit="4"
            strokeWidth="2"
            d="M5.308 10.964c-1.203 1.412-2.138 3.094-2.702 4.937l-0.026 0.099c1.78 5.833 7.115 10.003 13.423 10.003 1.358 0 2.672-0.193 3.914-0.554l-0.099 0.025M8.304 8.304c2.167-1.443 4.831-2.303 7.695-2.303 6.306 0 11.639 4.167 13.395 9.897l0.026 0.099c-0.985 3.227-3.008 5.89-5.673 7.666l-0.051 0.032M8.304 8.304l-4.304-4.304M8.304 8.304l4.868 4.866M23.696 23.696l4.304 4.304M23.696 23.696l-4.866-4.866c0.724-0.724 1.172-1.724 1.172-2.829 0-2.21-1.791-4.001-4.001-4.001-1.105 0-2.105 0.448-2.829 1.172v0M18.828 18.828l-5.654-5.654"
          />
        </symbol>
        <symbol id="icon-eye-1" viewBox="0 0 32 32">
          <path
            fill="none"
            stroke="#4d5ae5"
            strokeLinejoin="round"
            strokeLinecap="round"
            strokeMiterlimit="4"
            strokeWidth="1.3333"
            d="M2.715 16.429c-0.044-0.127-0.069-0.274-0.069-0.426s0.025-0.299 0.072-0.435l-0.003 0.009c1.849-5.564 7.099-9.577 13.285-9.577 6.184 0 11.431 4.009 13.284 9.571 0.093 0.276 0.093 0.575 0 0.852-1.848 5.564-7.097 9.577-13.284 9.577-6.184 0-11.432-4.009-13.285-9.571z"
          />
          <path
            fill="none"
            stroke="#4d5ae5"
            strokeLinejoin="round"
            strokeLinecap="round"
            strokeMiterlimit="4"
            strokeWidth="1.3333"
            d="M20 16c0 2.209-1.791 4-4 4s-4-1.791-4-4v0c0-2.209 1.791-4 4-4s4 1.791 4 4v0z"
          />
        </symbol>
      </svg>

      {/* Модальное окно */}
      <div className={styles["modal-backdrop"]} onClick={onClose}>
        <div
          className={styles["modal-content"]}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Заголовок */}
          <div className={styles["modal-header"]}>
            <h2>Setting</h2>
            <button className={styles["close-button"]} onClick={onClose}>
              <svg width="24" height="24">
                <use xlinkHref="#icon-x-mark" />
              </svg>
            </button>
          </div>

          {/* Блок Your photo */}
          <div className={styles["photo-section"]}>
            <label className={styles["photo-label"]}>Your photo</label>
            <div className={styles["photo-container"]}>
              {/* Фото */}
              <div
                className={styles["photo-preview"]}
                style={{
                  backgroundImage: formData.photo
                    ? `url(${formData.photo})`
                    : "none",
                }}
              ></div>

              {/* Иконка и кнопка */}
              <div className={styles["photo-upload"]}>
                <svg className={styles["upload-icon"]} width="16" height="16">
                  <use xlinkHref="#icon-arrow-up-tray" />
                </svg>
                <label className={styles["upload-text"]}>
                  Upload a photo
                  <input
                    type="file"
                    accept="image/*"
                    className={styles["hidden-input"]}
                    onChange={handlePhotoUpload}
                  />
                </label>
              </div>
            </div>
          </div>
          <form onSubmit={handleSubmit} className={styles["form-container"]}>
            <div className={styles["form-layout"]}>
              {/* Левая колонка */}
              <div className={styles["left-column"]}>
                {/* Gender Identity Section */}
                <div className={styles["gender-section"]}>
                  <label className={styles["gender-label"]}>
                    Your gender identity
                  </label>
                  <div className={styles["gender-options"]}>
                    {/* Woman */}
                    <div className={styles["gender-option"]}>
                      <input
                        type="radio"
                        id="female"
                        name="gender"
                        value="female" // Храним как "female"
                        checked={formData.gender === "female"}
                        onChange={handleGenderChange}
                        className={styles["hidden-radio"]}
                      />
                      <label
                        htmlFor="female"
                        className={styles["gender-label"]}
                      >
                        <svg width="32" height="32">
                          <use
                            xlinkHref={
                              formData.gender === "female"
                                ? "#icon-touch1"
                                : "#icon-touch"
                            }
                          />
                        </svg>
                        Woman
                      </label>
                    </div>

                    {/* Man */}
                    <div className={styles["gender-option"]}>
                      <input
                        type="radio"
                        id="male"
                        name="gender"
                        value="male" // Храним как "male"
                        checked={formData.gender === "male"}
                        onChange={handleGenderChange}
                        className={styles["hidden-radio"]}
                      />
                      <label htmlFor="male" className={styles["gender-label"]}>
                        <svg width="32" height="32">
                          <use
                            xlinkHref={
                              formData.gender === "male"
                                ? "#icon-touch1"
                                : "#icon-touch"
                            }
                          />
                        </svg>
                        Man
                      </label>
                    </div>
                  </div>
                </div>

                <div className={styles["combined-section"]}>
                  {/* Input Section */}
                  <div className={styles["input-section"]}>
                    {/* Your name */}
                    <div className={styles["input-group"]}>
                      <label htmlFor="name" className={styles["input-label"]}>
                        Your name
                      </label>
                      <input
                        id="name"
                        type="text"
                        name="name"
                        value={formData.name}
                        placeholder="Enter your name"
                        onChange={handleChange}
                        className={styles["input-field"]}
                      />
                    </div>

                    {/* E-mail */}
                    <div className={styles["input-group"]}>
                      <label htmlFor="email" className={styles["input-label"]}>
                        E-mail
                      </label>
                      <input
                        id="email"
                        type="email"
                        name="email"
                        value={formData.email}
                        placeholder="Enter your email"
                        onChange={handleChange}
                        className={styles["input-field"]}
                      />
                    </div>
                  </div>
                </div>
              </div>
              {/* Правая колонка */}
              <div className={styles["right-column"]}>
                {/* Password Section */}
                <div className={styles["password-section"]}>
                  <label className={styles["section-label"]}>Password</label>

                  {["outdatePassword", "newPassword", "repeatPassword"].map(
                    (field) => (
                      <div className={styles["password-group"]} key={field}>
                        <label
                          htmlFor={field}
                          className={styles["password-input-label"]}
                        >
                          {field === "outdatePassword"
                            ? "Outdated password:"
                            : field === "newPassword"
                            ? "New Password:"
                            : "Repeat new password:"}
                        </label>
                        <div className={styles["input-container"]}>
                          <input
                            id={field}
                            type={
                              passwordVisibility[field] ? "text" : "password"
                            }
                            name={field}
                            value={formData[field]}
                            onChange={handleChange}
                            className={styles["password-input"]}
                            placeholder="Password"
                          />
                          <button
                            type="button"
                            className={styles["visibility-button"]}
                            onClick={() => togglePasswordVisibility(field)}
                          >
                            <svg width="16" height="16">
                              <use
                                xlinkHref={
                                  passwordVisibility[field]
                                    ? "#icon-eye-1"
                                    : "#icon-eye-slash-1"
                                }
                              />
                            </svg>
                          </button>
                        </div>
                      </div>
                    )
                  )}
                </div>
              </div>
            </div>

            {/* Контейнер кнопки */}
            <div className={styles["button-container"]}>
              <button
                type="submit"
                className={styles["save-button"]}
                disabled={isLoading}
              >
                {isLoading ? (
                  <div className={styles["loader-container"]}>
                    <Loader />
                  </div>
                ) : (
                  "Save"
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default SettingModal;
