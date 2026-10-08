interface ImportMetaEnv {
  /** Llave publica de Web3Forms (es publica por diseno). Sin ella el formulario cae a un enlace mailto. */
  readonly PUBLIC_WEB3FORMS_KEY?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
