require "application_system_test_case"

# TODO: this should be able to test React happy path...
class JournalsTest < ApplicationSystemTestCase
  setup do
    @journal = journals(:one)
    @journal_entry = journal_entries(:one)
  end

  test "visiting the index" do
    visit journals_url
    assert_selector "h1", text: "Journals"
  end

  test "creating a Journal" do
    visit journals_url
    click_on "New Journal"

    fill_in "Name", with: @journal.name
    click_on "Create Journal"

    assert_text "Journal was successfully created"
    click_on "Back"
  end

  test "creating a Journal task with collection from Journal view" do
    visit journals_url
    click_on "Show", match: :first

    fill_in "Text", with: @journal_entry.text
    fill_in "Collection", with: @journal_entry.collection
    check "Is task"

    click_on "Create Journal entry"
    # TODO: wait for React!
    # assert_text @journal_entry.text
    # assert_text @journal_entry.collection

    click_on "Back"
  end

  test "updating a Journal" do
    visit journals_url
    click_on "Edit", match: :first

    fill_in "Name", with: @journal.name
    click_on "Update Journal"

    assert_text "Journal was successfully updated"
    click_on "Back"
  end

  test "destroying a Journal" do
    visit journals_url
    page.accept_confirm do
      click_on "Destroy", match: :first
    end

    assert_text "Journal was successfully destroyed"
  end
end
