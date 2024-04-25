import React from 'react'
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form'
import './RegisterForm.css'
import logo from "../img/Log.png";
// npm i react-hook-form

function RegisterForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
    reset,
  } = useForm({
    defaultValues: {
      nombre: "Ale",
      correo: "Escribe gono"
    }
  })
  console.log(errors)
  const onSubmit = handleSubmit((data) => {
    console.log(data);
    alert('enviando datos...');
    reset()
  })

  return (
    <>
      <nav className="NavbarItems">
        <Link className="nav-link-logo" to="/">
          <div className="logoContainer">
            <img src={logo} alt="Logo" />
            <h1 className="navbar-logo" >Compostify</h1>
          </div>
        </Link>
      </nav>
      <div className="Register-Forms">
        <form onSubmit={onSubmit}>
          {/* nombre */}
          <label
            htmlFor='nombre'>Nombre
          </label>
          <input type='text'
            {...register("nombre", {
              required: {
                value: true,
                message: "Nombre es requerido"
              },
              minLength: {
                value: 2,
                message: "Nombre debe tener al menos 2 caracteres"
              },
              maxLength: {
                value: 22,
                message: "Nombre debe tener máximo 22 caracteres"
              }
            })}
          />
          {
            errors.nombre && <span>{errors.nombre.message}</span>
          }

          {/* correo */}
          <label htmlFor='correo'>Correo
          </label>
          <input type='email'
            {...register("correo", {
              required: {
                value: true,
                message: "Correo es requerido"
              },
              pattern: {
                value: /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/,
                message: "Correo no válido"
              }
            })}
          />
          {
            errors.correo && <span>{errors.correo.message}</span>
          }


          {/* Password */}
          <label htmlFor='password'>Contraseña
          </label>
          <input type='password'
            {...register("password", {
              required: {
                value: true,
                message: "Contraseña es requerida"
              },
              minLength: {
                value: 6,
                message: "Contraseña debe tener al menos 6 caracteres",

              }
            })}
          />
          {
            errors.password && <span>{errors.password.message}</span>
          }


          {/* Confirmar password */}
          <label htmlFor='confirmarPassword'>Confirmar contraseña</label>
          <input
            type='password'
            {...register("confirmarPassword", {
              required: {
                value: true,
                message: "Confirmar contraseña es requerido",
              },
              validate: value => value === watch
                ('password') || 'Las contraseñas no coinciden'
            })}

          />
          {
            errors.confirmarPassword && (
              <span>
                {errors.confirmarPassword.message}
              </span>
            )
          }


          {/* fecha de nacimiento */}
          <label htmlFor='fechaNacimiento'>Fecha de nacimiento</label>
          <input type='date'
            {...register("fechaNacimiento", {
              required: {
                value: true,
                message: "Fecha de nacimiento es requerida"
              },
              validate: (value) => {
                const fechaNacimento = new Date(value);
                const fechaActual = new Date();
                const edad = fechaActual.getFullYear() - fechaNacimento.getFullYear();

                return edad >= 18 || "Deber ser mayor de edad";
              },
            })}

          />
          {
            errors.fechaNacimiento && <span>{errors.fechaNacimiento.message}</span>
          }



          {/* pais */}

          <label htmlFor='pais'>País</label>
          <select
            {...register("pais")}

          >
            <option
              value="mx">México
            </option>
            <option
              value="co">Colombia
            </option>
            <option
              value="ar">Argentina
            </option>
          </select>
          {
            watch('pais') === 'ar' && (
              <>
                <input
                  type='text'
                  placeholder='Provincia'
                  {...register('provincia', {
                    required: {
                      value: true,
                      message: 'Provincia es requerida'
                    }
                  })}
                />
                {errors.provincia && <span>{errors.provincia.message}</span>}

              </>
            )
          }

          {/* file */}
          <label htmlFor='foto'>Foto de perfil</label>
          <input type='file' onChange={(e) => {
            console.log(e.target.files[0])
            setValue('fotoDelUsuario', e.target.files[0].name)
          }}

          />

          {/* terminos */}
          <label
            htmlFor='terminos'>Aceptar los términos y condiciones
          </label>
          <input type='checkbox'
            {...register("terminos", {
              required: {
                value: true,
                message: "Debes aceptar los términos y condiciones",
              },
            })}

          />
          {
            errors.terminos && <span>{errors.terminos.message}</span>
          }
          <button type='submit'>
            Enviar
          </button>
          <pre>
            {JSON.stringify(watch(), null, 2)}
          </pre>

        </form>
      </div>
    </>
  )
}

export default RegisterForm