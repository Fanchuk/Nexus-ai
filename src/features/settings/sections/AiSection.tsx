import SettingsSection from "../SettingsSection";
import SettingRow from "../SettingRow";
import SelectControl from "../SelectControl";

export default function AiSection() {
  return (
    <SettingsSection id="ai" title="AI preferences">
      <SettingRow label="Text model" control={<SelectControl options={["Balanced", "Fast", "Deep"]} />} />
      <SettingRow label="Image model" control={<SelectControl options={["Diffusion XL", "Diffusion Lite"]} />} />
      <SettingRow label="Default image style" control={<SelectControl options={["Cinematic", "Photo", "Illustration"]} />} />
      <SettingRow label="Answer language" control={<SelectControl options={["English", "Українська"]} />} />
      <SettingRow
        label="Default command bar mode"
        hint="Used when you press enter without picking a mode"
        control={<SelectControl options={["Search the web", "Create an image", "Analyze a document"]} />}
      />
    </SettingsSection>
  );
}