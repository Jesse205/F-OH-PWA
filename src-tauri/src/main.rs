// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]
use tauri::{utils::config::AppUrl, window::WindowBuilder, WindowUrl};

fn main() {
    let port = portpicker::pick_unused_port().expect("failed to find unused port");

    let mut context = tauri::generate_context!();
    let url = format!("http://localhost:{}", port).parse().unwrap();
    let window_url = WindowUrl::External(url);
    // rewrite the config so the IPC is enabled on this URL
    context.config_mut().build.dist_dir = AppUrl::Url(window_url.clone());

    tauri::Builder::default()
        .plugin(tauri_plugin_localhost::Builder::new(port).build())
        .setup(move |app| {
            WindowBuilder::new(
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
            .title(app.package_info().name.clone())
            .inner_size(960.0, 600.0)
            .min_inner_size(320.0, 480.0)
            .build()?;
            Ok(())
        })
        .run(context)
        .expect("error while running tauri application");
}
