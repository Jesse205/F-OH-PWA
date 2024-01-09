// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]
use tauri::window::WindowBuilder;
use tauri::{AppHandle, Builder, Manager};
use window_shadows;

fn main() {
    let context = tauri::generate_context!();
    Builder::default()
        .invoke_handler(tauri::generate_handler![set_shadow])
        .setup(move |app| {
            let window = WindowBuilder::new(app, "main".to_string(), Default::default())
                .center()
                .resizable(true)
                .transparent(false)
                .decorations(false)
                .visible(false)
                .title(app.package_info().name.clone())
                .inner_size(960.0, 600.0)
                .min_inner_size(320.0, 480.0)
                .build()
                .unwrap();
            set_shadow(app.app_handle(), window.label());
            let _ = window.show();
            Ok(())
        })
        .run(context)
        .expect("error while running tauri application");
}

#[tauri::command]
fn set_shadow(app: AppHandle, label: &str) {
    let window = app.get_window(label).unwrap();
    #[cfg(any(windows, target_os = "macos"))]
    window_shadows::set_shadow(&window, true).unwrap();
}
