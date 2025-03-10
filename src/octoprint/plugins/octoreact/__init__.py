import os


import octoprint.plugin


class OctoReactPlugin(octoprint.plugin.UiPlugin,
                      octoprint.plugin.TemplatePlugin, octoprint.plugin.BlueprintPlugin):

    @octoprint.plugin.BlueprintPlugin.route("/ui/<path:filename>", methods=["GET"])
    def static_out(self, filename):
        from flask import send_from_directory
        if filename == "":
            filename = "index.html"
        return send_from_directory(os.path.join(os.path.dirname(__file__), "static", "out"), filename)

    def will_handle_ui(self, request):
        # returns True if the User Agent sent by the client matches one of
        # the User Agent strings known for any of the platforms android, ipad
        # or iphone
        return True

    def on_ui_render(self, now, request, render_kwargs):
        # if will_handle_ui returned True, we will now render our custom index
        # template, using the render_kwargs as provided by OctoPrint
        from flask import make_response, render_template, redirect
        t = redirect("/plugin/octoreact/ui/index.html")
        return make_response(t)


__plugin_name__ = "OctoReact"
__plugin_version__ = "0.1.0"
__plugin_description__ = "A React frontend for OctoPrint"
__plugin_pythoncompat__ = ">=3.7,<4"
__plugin_implementation__ = OctoReactPlugin()
