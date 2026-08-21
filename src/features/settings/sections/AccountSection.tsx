import SettingsSection from "../SettingsSection";
import SettingRow from "../SettingRow";

export default function AccountSection() {
  return (
    <SettingsSection id="account" title="Account">
      <div className="flex items-center gap-4">
        <span className="grid size-14 shrink-0 place-items-center rounded-full bg-gradient-to-br from-azure to-iris p-px">
          <span className="grid size-full place-items-center rounded-full bg-surface text-sm">AN</span>
        </span>
        <button className="rounded-xl border border-line px-4 py-2.5 text-sm transition-colors duration-300 hover:bg-raised">
          Change photo
        </button>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        {[
          { label: "Name", value: "Andrii Nazarov" },
          { label: "Email", value: "andrii@nexus.app" },
        ].map((field) => (
          <label key={field.label} className="block">
            <span className="mb-2 block text-sm text-muted">{field.label}</span>
            <input
              defaultValue={field.value}
              className="w-full rounded-xl border border-line bg-raised px-4 py-3 text-sm outline-none transition-colors duration-300 focus:border-iris/60"
            />
          </label>
        ))}
      </div>

      <SettingRow
        label="Password"
        hint="Last changed 3 months ago"
        control={
          <button className="rounded-xl border border-line px-4 py-2.5 text-sm transition-colors duration-300 hover:bg-raised">
            Update
          </button>
        }
      />

      <SettingRow
        label="Delete account"
        hint="This removes all canvases and files"
        control={
          <button className="rounded-xl border border-magenta/40 px-4 py-2.5 text-sm text-magenta transition-colors duration-300 hover:bg-magenta/10">
            Delete
          </button>
        }
      />
    </SettingsSection>
  );
}