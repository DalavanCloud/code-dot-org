#! /usr/bin/env ruby
require 'fileutils'

## copy files from hourofcode to i18n/locales

loc_dir = "../locales/source/hourofcode/i18n"
orig_file = "../../pegasus/sites.v3/hourofcode.com/i18n/en.yml"
FileUtils.cp(orig_file, loc_dir)

orig_dir = Dir["../../pegasus/sites.v3/hourofcode.com/public/*.md"]
orig_dir.each do |file|
  loc_dir = "../locales/source/hourofcode/public"
  FileUtils.cp(file, loc_dir)
end

orig_dir = Dir["../../pegasus/sites.v3/hourofcode.com/public/resources/*.md"]
orig_dir.each do |file|
  loc_dir = "../locales/source/hourofcode/public/resources"
  FileUtils.cp(file, loc_dir)
end

orig_dir = Dir["../../pegasus/sites.v3/hourofcode.com/public/files/*.idml"]
orig_dir.each do |file|
  loc_dir = "../locales/source/hourofcode/public/files"
  FileUtils.cp(file, loc_dir)
end