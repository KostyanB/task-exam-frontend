/*Vendors*/
import "normalize.css";

require("./variables.css");
require("./media.css");
require("./helpers.css");
require("./grid.css");
require("./icons.css");
require("./styles.css");
require("./fonts.css");
require("./forms.css");
require("./lazy-load.css");

require("./mixins.css");
require("./task.css");
require("./task-popup.css");
require("./task-slider.css");

/*All components*/

function requireAll(requireContext) {
    return requireContext.keys().map(requireContext);
}
requireAll(require.context("./components", false, /.css$/));
