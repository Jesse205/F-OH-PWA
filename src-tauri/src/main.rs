// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]
use tauri::{utils::config::AppUrl, window::WindowBuilder, WindowUrl};
use tauri::{AppHandle, Manager};
use window_shadows;

fn main() {
    let port = portpicker::pick_unused_port().expect("failed to find unused port");

    let mut context = tauri::generate_context!();
    let url = format!("http://localhost:{}", port).parse().unwrap();
    let window_url = WindowUrl::External(url);
    // rewrite the config so the IPC is enabled on this URL
    context.config_mut().build.dist_dir = AppUrl::Url(window_url.clone());

    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![set_shadow])
        .plugin(tauri_plugin_localhost::Builder::new(port).build())
        .setup(move |app| {
            let window = WindowBuilder::new(
                app,
                "main".to_string(),
                if cfg!(dev) {
                    Default::default()
                } else {
                    window_url
                },
            )
            .center()
            .resizable(true)
            .transparent(true)
            .decorations(false)
            .title(app.package_info().name.clone())
            .inner_size(960.0, 600.0)
            .min_inner_size(320.0, 480.0)
            .build()
            .unwrap();
            set_shadow(app.app_handle(), window.label());
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
