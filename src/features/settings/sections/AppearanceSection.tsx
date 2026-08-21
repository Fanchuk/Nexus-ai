import SettingsSection from "../SettingsSection";
import SettingRow from "../SettingRow";
import SelectControl from "../SelectControl";
import Toggle from "@/components/ui/Toggle";

const presets = ["from-iris to-magenta", "from-cobalt to-azure", "from-mint to-acid", "from-gold to-magenta"];

export default function AppearanceSection() {
  return (
    <SettingsSection id="appearance" title="Appearance">
      <SettingRow label="Theme" control={<SelectControl options={["Dark", "System"]} />} />
      <SettingRow label="Canvas density" control={<SelectControl options={["Comfortable", "Compact"]} />} />
      <SettingRow label="Show grid on canvas" control={<Toggle defaultChecked />} />

      <div>
        <p className="mb-3 text-sm">Accent gradient</p>
        <div className="flex gap-3">
          {presets.map((preset, index) => (
            <button
              key={preset}
              className={`size-11 rounded-xl bg-gradient-to-br transition-transform duration-300 hover:scale-105 ${preset} ${
                index === 0 ? "ring-2 ring-fg ring-offset-2 ring-offset-surface" : ""
              }`}
            />
          ))}
        </div>
      </div>
    </SettingsSection>
  );
}